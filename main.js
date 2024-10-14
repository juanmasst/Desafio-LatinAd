const { app, BrowserWindow, globalShortcut } = require("electron");

try {
	require('electron-reloader')(module);
} catch {}

function createWindow () {
  const win = new BrowserWindow({
    width: 800, 
    height: 600, 
    x: 100, 
    y: 100, 
    frame: false, // Sin marcos
    titleBarStyle: 'hiddenInset', // Ocultar la barra de título pero mantener los botones en macOS
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Permitir el uso de Node.js en el contexto de la página web
    }
  });

  win.setMenu(null); // Ocultar el menú
  win.loadFile("index.html");

  // Ocultar el cursor del mouse cuando esté sobre la ventana
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('body { cursor: none; }');
  });

  // Registrar un atajo de teclado para alternar entre pantalla completa y modo ventana
  globalShortcut.register('F11', () => {
    win.setFullScreen(!win.isFullScreen());
  });
}

app.whenReady().then(() => {
  createWindow();

  // Registrar atajos de teclado globales
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