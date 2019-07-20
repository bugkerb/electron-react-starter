const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680, 
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration: true,
     // preload: path.join(__dirname, 'renderer.js'),
      webSecurity: !isDev
    }
  });
  
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  if (isDev) {
    // Open the DevTools.
    BrowserWindow.addDevToolsExtension(path.join(__dirname, 'chrome-extensions', 'react-dev-tools'));
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});