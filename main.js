const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const url = require('url');
const path = require('path');
const os = require('os');
const util = require('util');
const glob = util.promisify(require('glob'));
const fs = require('fs');
const fslstat = util.promisify(fs.lstat);
const md5File = require('md5-file/promise');

let mainWindow;
const ddupicDir = `${os.homedir()}/.ddupic`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
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
  const items = await evaluatePathElements(pathElements);

  ddupic.fileCount = items.length;
  ddupic.ddupicItems = items.sort(compareDdupics);
  let dupMap = new Map();
  items.forEach(item => {
    const md5 = item.md5;
    if (dupMap.has(md5)) {
      let dups = dupMap.get(md5);
      dups.push(item);
    } else {
      dupMap.set(md5, [item]);
    }
  });

  const dupArray = [];
  dupMap.forEach((value, key) => {
    dupArray.push({
      md5: key,
      items: Array.from(value)
    });
  });

  ddupic.ddupicDupItems = dupArray;
  let success = await writeDdupic(ddupic);
  mainWindow.webContents.send('processDdupicResponse', success);
}

async function recurseDirectory(basePath) {
  return await glob(`${basePath}/**/*`);
}

function compareDdupics(a, b) {
  if (a.md5 < b.md5) {
    return -1;
  }
  if (a.md5 > b.md5) {
    return 1;
  }
  return 0;
}

async function evaluatePathElements(pathElements) {
  const peCategorized = await Promise.all(pathElements.map(findDirectoies));
  const files = await Promise.all(peCategorized.filter(res => {
    return res.is_file;
  }));
  return await Promise.all(files.map(files => mapDdupics(files)));
}

async function findDirectoies(pe) {
  const foo = await fslstat(pe);
  return {
    path_element: pe,
    is_file: foo.isFile(),
  };
}

async function mapDdupics(pathElement) {
  const pe = pathElement.path_element;
  const flePath = path.dirname(pe);
  const fileName = path.basename(pe);
  let md5Sum = await md5File(pe);
  return {
    file_path: flePath,
    file_name: fileName,
    md5: md5Sum,
    date_modified: Date.now(),
  };
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
