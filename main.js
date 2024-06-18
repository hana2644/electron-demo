const { app, BrowserWindow, ipcMain, dialog } = require("electron/main");
const path = require("node:path");
const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // 接受主进程的修改标题消息信息
  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    // win.setTitle(title);
    mainWin.setTitle(title);
  });

  ipcMain.handle("dialog:openFile", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (!canceled) return filePaths?.[0];
  });

  mainWin.loadFile("index.html");
};
app.whenReady()?.then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform != "darwin") app.quit();
});
