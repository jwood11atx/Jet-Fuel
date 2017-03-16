const $folderList = document.getElementsByClassName("folder");
const $folderSection = document.getElementById("folder-section");
const $folderSubmit = document.getElementById("folder-submit");
const $urlInputSection = document.getElementById("url-input-section");
// const selectFolder = require("./helper/folders.js");
let selected = "";

window.onload = () => {
  fetch("http://localhost:3000/folders")
  .then(res => res.json())
  .then(json => {
    if (json.folders.length !== 0) displayFolders(json);
  });
};

$folderSubmit.addEventListener("click", () => {
  createFolder();
});

$folderSection.addEventListener("click", (event) => {
  selectFolder(event);
  reselectFolder();
});

$urlInputSection.addEventListener("click", (event) => {
  if(event.target.id === "url-submit"){
    const url = document.getElementById("url-input").value;
    const id = document.querySelector(".selected").id;
    fetch(`http://localhost:3000/folders/${id}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url})
    })
      .then(res => res.json())
      .then(json => displayURLs(json));
  }
});
