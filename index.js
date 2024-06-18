window.onload = () => {
  const updateWinTitleBtn = document.getElementById("update-title-btn");
  const chooseFileBtn = document.getElementById("choose-file-btn");
  const filePathDom = document.getElementById("file-path");
  updateWinTitleBtn.addEventListener("click", () => {
    const title = "修改标题";
    window.electronApi.setTitle(title);
  });

  chooseFileBtn.addEventListener("click", async () => {
    const filePath = await window.electronApi.openFile();
    filePathDom.innerText = filePath;
  });
};
