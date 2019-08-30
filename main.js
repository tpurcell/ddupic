const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');
const util = require('util');
const glob = util.promisify(require('glob'));

let mainWindow;
const ddupicDir = `${os.homedir()}/.ddupic`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: 'file:',
      slashes: true,
    }),
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function createDirectory() {
  try {
    fs.mkdirSync(ddupicDir);
  } catch (e) {
    console.info('ddupic directory already exists');
  }
}

app.on('ready', createDirectory);
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('listDdupics', () => {
  const files = fs.readdirSync(ddupicDir);
  mainWindow.webContents.send('listDdupicsResponse', files);
});

ipcMain.on('processDdupic', (event, ddupic) => {
  processDdupic(ddupic);
});

async function processDdupic(ddupic) {
  let pathElements = await recurseDirectory(ddupic.ddupicPath);
  ddupic.ddupicItems = await evaluatePathElements(pathElements);
  let success = await writeDdupic(ddupic);
  mainWindow.webContents.send('processDdupicResponse', success);
}

async function recurseDirectory(basePath) {
  return await glob(`${basePath}/**/*`);
}

async function evaluatePathElements(pathElements) {
  let peArray = Array.from(pathElements);
  return peArray.map(pe => {
    const flePath = path.dirname(pe);
    const fileName = path.basename(pe);
    return {
      file_path: flePath,
      file_name: fileName,
      md5: 1234,
      date_modified: Date.now(),
    };
  });
}

async function writeDdupic(ddupic) {
  let success = true;
  try {
    fs.writeFileSync(`${ddupicDir}/${ddupic.ddupicName}.json`, JSON.stringify(ddupic), 'utf-8');
  } catch (e) {
    dialog.showErrorBox(`DDuPic error occurred saving ${ddupic.ddupicName}`, JSON.stringify(e));
    success = false;
  }
  return success;
}

ipcMain.on('readDdupic', (event, arg) => {
  let name = arg;
  let ddupic = '';
  try {
    ddupic = fs.readFileSync(`${ddupicDir}/${name}.json`);
  } catch (e) {
    dialog.showErrorBox(`DDuPic error occurred reading ${name}`, JSON.stringify(e));
  }
  mainWindow.webContents.send('readDdupicResponse', ddupic.toString());
});

ipcMain.on('selectDirectory', () => {
  let options = { properties: ['openDirectory'] };

  dialog.showOpenDialog(options, (dir) => {
    mainWindow.webContents.send('selectDirectoryResponse', dir);
  });
});
