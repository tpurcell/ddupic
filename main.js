const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;
const ddupicDir = `${os.homedir()}/.ddupic`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createDirectory() {
  try {
    fs.mkdirSync(ddupicDir);
  } catch (e) {
    console.warn('ddupic directory already exists');
  }
}

app.on('ready', createDirectory);
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) createWindow()
});

ipcMain.on('listDdupics', () => {
  const files = fs.readdirSync(ddupicDir);
  mainWindow.webContents.send('listDdupicsResponse', files);
});

ipcMain.on('writeDdupic', (event, arg) => {
  let success = true;
  let name = arg.ddupicName;
  let ddupic = processDdupic(arg);
  try {
    fs.writeFileSync(`${ddupicDir}/${name}.json`, JSON.stringify(ddupic), 'utf-8');
  } catch (e) {
    dialog.showErrorBox(`DDuPic error occurred saving ${name}`, JSON.stringify(e));
    success = false;
  }
  mainWindow.webContents.send('writeDdupicResponse', success);
});

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
  })
});

function processDdupic(arg) {
  return arg;
}
