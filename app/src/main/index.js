import { app, BrowserWindow, globalShortcut, Menu, Tray, screen } from 'electron';


const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`;

let mainWindow, trayMenu;

app.on('ready', () => {
  // Hide Dock Icon
  app.dock.hide();

  // Create Window
  mainWindow = new BrowserWindow({
    height: 576,
    width: 360,
    // x: 0,
    // y: 0,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    skipTaskBar: true,
    show: false,
    frame: false,
    backgroundColor: '#313540',
    transparent: false,
    // titleBarStyle: 'hidden'
  });
  mainWindow.loadURL(winURL);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  // eslint-disable-next-line no-console
  console.log('mainWindow opened');

  // Create Tray Menu
  trayMenu = new Tray(`${__dirname}/../../icons/icon@16.png`);
  trayMenu.on('click', () => {
    var cursorPosition = screen.getCursorScreenPoint();
    mainWindow.setPosition(cursorPosition.x - 180, 0);
    mainWindow.show();
    mainWindow.focus();
  });
  trayMenu.setToolTip('Clipaste');
  // eslint-disable-next-line no-console
  console.log('trayMenu opened');

  globalShortcut.register('CmdOrCtrl+Shift+V', () => {
    mainWindow.show();
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // if (mainWindow === null) {
  //   createWindow();
  // }
});
