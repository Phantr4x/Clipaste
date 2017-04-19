/* eslint-disable */
import {
  app,
  BrowserWindow,
  globalShortcut,
  Tray,
  screen,
  ipcMain,
  clipboard,
  nativeImage
} from 'electron';
import fs from 'fs';
import path from 'path';
// import crypto from 'crypto';

global.settings = require('../settings.json');
global.paths = {
  home: app.getPath('home'),
  appData: app.getPath('appData'),
  temp: app.getPath('temp'),
  downloads: app.getPath('downloads'),
};

const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:${require('../../../config').port}` :
  `file://${__dirname}/index.html`;

let mainWindow;
let trayMenu;

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

const trayMenuConstructor = () => {
  trayMenu = new Tray(`${__dirname}/icons/tray@5x.png`);
  trayMenu.setPressedImage(`${__dirname}/icons/tray-pressed@5x.png`);
  // trayMenu = new Tray(`${__dirname}/../../dist/icons/tray@5x.png`);
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

const shortcutRegister = () => {
  if (!globalShortcut.isRegistered(global.settings.shortcuts.show_clipboard)) {
    globalShortcut.register(global.settings.shortcuts.show_clipboard, () => {
      mainWindow.show();
    });
  } else {
    // eslint-disable-next-line no-console
    console.log(`Registration for ${global.settings.shortcuts.show_clipboard} failed!`);
  }
};

const sourceGenerator = () => {
  const appDataPath = `${global.paths.appData}/Clipaste`;

  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath, (err) => {
      if (err) throw err;
    });
  }

  if (!fs.existsSync(`${appDataPath}/temp`)) {
    fs.mkdirSync(`${appDataPath}/temp`, (err) => {
      if (err) throw err;
    });
  }

  if (!fs.existsSync(`${appDataPath}/source.json`)) {
    fs.writeFileSync(`${appDataPath}/source.json`, '[]', (err) => {
      if (err) throw err;
    });
  }
};

app.on('ready', () => {
  app.dock.hide();
  mainWindowConstructor();
  trayMenuConstructor();
  shortcutRegister();
  sourceGenerator();

  global.history = fs.readFileSync(`${global.paths.appData}/Clipaste/source.json`, 'utf-8');

  // BrowserWindow.removeDevToolsExtension('Vue.js devtools');
  // BrowserWindow.addDevToolsExtension('/Users/Phantr4x/Workspace/vue-devtools/shells/chrome');

  ipcMain.on('image-append', (event, fileName, img) => {
    fs.writeFile(`${global.paths.appData}/Clipaste/temp/${fileName}.png`, img, (err) => {
      if (err) throw err;
      console.log(`[APPEND] ${global.paths.appData}/Clipaste/temp/${fileName}.png`);
    });
  });

  ipcMain.on('image-delete', (event, fileName) => {
    fs.unlink(`${global.paths.appData}/Clipaste/temp/${fileName}.png`, (err) => {
      if (err) throw err;
      console.log(`[DELETE] ${global.paths.appData}/Clipaste/temp/${fileName}.png`);
    });
  });

  ipcMain.on('content-sync', (event, storage) => {
    fs.writeFile(`${global.paths.appData}/Clipaste/source.json`, storage, (err) => {
      if (err) throw err;
      console.log(`[SYNC] ${global.paths.appData}/Clipaste/source.json`);
    });
  });

  // ipcMain.on('checksum', (event, buffer, type = 'md5') => {
  //   const hash = crypto.createHash(type);
  //   event.returnValue = hash.update(buffer).digest('hex');
  // });
});

app.on('activate', () => {
  if (mainWindow === null) mainWindowConstructor();
  if (trayMenu === null)   trayMenuConstructor();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
