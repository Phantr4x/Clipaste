import fs from 'fs';
import {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut,
  Menu,
  Tray,
  screen,
  clipboard,
  ipcRenderer
} from 'electron';
import yaml from 'js-yaml';
const sqlite3 = require('sqlite3').verbose();

import doob from '../modules/doob';
import clipocher from '../modules/clipocher';
import clippingsHandler from '../modules/clippings-handler';

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`;

// 加载配置文件
let SETTINGS;
try {
  SETTINGS = yaml.safeLoad(
    fs.readFileSync(`${__dirname}/../settings.yml`, 'utf8')
  );
  // console.log(SETTINGS);
} catch (e) {
  console.log(e);
}

// 创建数据库
const db = new sqlite3.Database(`${__dirname}/../clipaste.db`);
db.serialize(() => {
  // db.run('DROP TABLE clipboard;');
  db.run('CREATE TABLE IF NOT EXISTS clipboard (id integer PRIMARY KEY NOT NULL, clipping text, is_image boolean NOT NULL DEFAULT(0), is_pinned boolean NOT NULL DEFAULT(0));');
  db.run('DELETE FROM clipboard;');
  db.all(`SELECT * FROM clipboard`, (err, rows) => {
    if (err) throw err;
    fs.writeFile(`${__dirname}/../temp.json`, JSON.stringify(rows), (err) => {
      if (err) throw err;
    });
  });
});

let output;
let clipboardWatcher, sqliteWatcher;
app.on('ready', () => {
  app.dock.hide();

  // 初始化窗口和托盘
  mainWindowConstructor();
  trayMenuConstructor();

  // 全局注册快捷键
  shortcutRegister();

  // 轮询系统剪贴板
  let timestamp;
  clipboardWatcher = clipocher({
    delay: 120,
    ontextchange: (text) => {
      timestamp = new Date().getTime();
      console.time('TextChange');
      // 判断文本大小
      text.length <= SETTINGS.GENERAL.MAX_SIZE * 1048576
        // 插入数据 [文本]
        ? doob.insert(db, 'clipboard', timestamp, clippingsHandler(timestamp, text), false, false)
        : console.log(`Text is larger than ${SETTINGS.GENERAL.MAX_SIZE}MB!`);
      console.timeEnd('TextChange');

      // 写入JSON
      db.all(`SELECT * FROM clipboard`, (err, rows) => {
        if (err) throw err;
        fs.writeFile(`${__dirname}/../temp.json`, JSON.stringify(rows), (err) => {
          if (err) throw err;
          // console.log(`temp.json saved.`);
        });
      });
    },
    onimagechange: (image) => {
      timestamp = new Date().getTime();
      console.time('ImageChange');
      const imgDataURL = image.toDataURL();
      // 判断图像大小
      imgDataURL.length <= SETTINGS.GENERAL.MAX_SIZE * 1048576
        // 插入数据 [图片绝对路径]
        ? doob.insert(db, 'clipboard', timestamp, clippingsHandler(timestamp, imgDataURL), true, false)
        : console.log(`Image is larger than ${SETTINGS.GENERAL.MAX_SIZE}MB!`);
      console.timeEnd('ImageChange');

      // 写入JSON
      db.all(`SELECT * FROM clipboard`, (err, rows) => {
        if (err) throw err;
        fs.writeFile(`${__dirname}/../temp.json`, JSON.stringify(rows), (err) => {
          if (err) throw err;
          // console.log(`temp.json saved.`);
        });
      });
    },
  });
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindowConstructor();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // global.clearInterval(poller);
  db.close();
  clipboardWatcher.stop();
  clearInterval(sqliteWatcher);
  // ipcMain.removeAllListeners();
  globalShortcut.unregisterAll();
});

let mainWindow;
const mainWindowConstructor = () => {
  mainWindow = new BrowserWindow({
    height: 576,
    width: 360,
    // resizable: false,
    movable: false,
    alwaysOnTop: true,
    skipTaskBar: true,
    show: false,
    frame: false,
    backgroundColor: '#FFFFFF',
    transparent: false,
  });
  mainWindow.loadURL(winURL);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  console.log('MainWindow Start');
};

let trayMenu;
const trayMenuConstructor = () => {
  trayMenu = new Tray(`${__dirname}/../../icons/trays/tray@5x.png`);
  trayMenu.setPressedImage(`${__dirname}/../../icons/trays/tray-pressed@5x.png`);
  let times = 0;
  trayMenu.on('click', () => {
    if (times++ === 0) {
      mainWindow.setPosition(screen.getCursorScreenPoint().x - 180, 0);
    }
    mainWindow.show();
    mainWindow.focus();
  });
  trayMenu.setToolTip('Clipaste');
  console.log('TrayMenu Start');
};

const shortcutRegister = () => {
  // Show clipboard
  if (!globalShortcut.isRegistered(SETTINGS.SHORTCUTS.SHOW_CLIPBOARD)) {
    globalShortcut.register(SETTINGS.SHORTCUTS.SHOW_CLIPBOARD, () => {
      mainWindow.show();
    });
  } else {
    console.log(`Registration for ${SETTINGS.SHORTCUTS.SHOW_CLIPBOARD} failed!`);
  }
};
