const { app, BrowserWindow, globalShortcut } = require("electron");

function createWindow () {
  const win = new BrowserWindow({
    width: 800, 
    height: 600, 
    x: 100, 
    y: 100, 
    frame: false, // borderless
    titleBarStyle: 'hiddenInset', // hide title bar
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // allow require in renderer
    }
  });

  win.setMenu(null); // hide menu bar
  win.loadFile("index.html");

  // hide cursor when window is loaded
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('body { cursor: none; }');
  });

  // full screen with F11 key
  globalShortcut.register('F11', () => {
    win.setFullScreen(!win.isFullScreen());
  });
}

app.whenReady().then(() => {
  createWindow();

  // global shortcut for full screen
  globalShortcut.register('F11', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.setFullScreen(!win.isFullScreen());
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});