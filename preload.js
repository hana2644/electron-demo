const { contextBridge, ipcRenderer } = require("electron/renderer");
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("electronApi", {
  setTitle: (title) => ipcRenderer.send("set-title", title), //渲染进程发送消息修改主进程标题
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
});
