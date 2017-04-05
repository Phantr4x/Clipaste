/* eslint-disable */
import {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  screen,
  ipcMain,
  ipcRenderer,
  clipboard,
  nativeImage
} from 'electron';
import fs from 'fs';
import path from 'path';

global.settings = require('../settings.json');

const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:${require('../../../config').port}` :
  `file://${__dirname}/index.html`;

let mainWindow;
let trayMenu;

// 主窗口构造器
const mainWindowConstructor = () => {
  mainWindow = new BrowserWindow({
    height: 576,
    width: 360,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    skipTaskBar: true,
    show: false,
    frame: false,
    backgroundColor: "#272527",
    transparent: false,
  });
  mainWindow.loadURL(winURL);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  // eslint-disable-next-line no-console
  console.log('MainWindow Start');
};

// 托盘构造器
const trayMenuConstructor = () => {
  trayMenu = new Tray(`${__dirname}/imgs/tray@5x.png`);
  trayMenu.setPressedImage(`${__dirname}/imgs/tray-pressed@5x.png`);
  let times = 0;
  trayMenu.on('click', () => {
    if (times++ === 0) {
      mainWindow.setPosition(screen.getCursorScreenPoint().x - 180, 0);
    }
    mainWindow.show();
    mainWindow.focus();
  });
  trayMenu.setToolTip('Clipaste');
  // eslint-disable-next-line no-console
  console.log('TrayMenu Start');
};

// 快捷键注册器
const shortcutRegister = () => {
  // 注册快捷键 => 展示剪贴板
  if (!globalShortcut.isRegistered(global.settings.shortcuts.show_clipboard)) {
    globalShortcut.register(global.settings.shortcuts.show_clipboard, () => {
      mainWindow.show();
    });
  } else {
    // eslint-disable-next-line no-console
    console.log(`Registration for ${global.settings.shortcuts.show_clipboard} failed!`);
  }
};

// let clipWatcher;
app.on('ready', () => {
  // 初始化 窗口&托盘
  app.dock.hide();
  mainWindowConstructor();
  trayMenuConstructor();
  // 注册 全局快捷键
  shortcutRegister();
  // 变更 Vue.js开发工具版本
  // BrowserWindow.removeDevToolsExtension('Vue.js devtools');
  // BrowserWindow.addDevToolsExtension('/Users/Phantr4x/Workspace/vue-devtools/shells/chrome');
});

app.on('activate', () => {
  if (mainWindow === null) mainWindowConstructor();
  if (trayMenu === null) trayMenuConstructor();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
