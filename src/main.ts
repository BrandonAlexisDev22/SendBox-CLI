import { app, BrowserWindow } from "electron";
import * as path from "path";
require('electron-reload')(path.join(__dirname, '..'), {
  electron: require(`${__dirname}/../node_modules/electron`)
});
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});