window.onload = () => {
  fetch("http://localhost:3000/folders")
  .then(res => res.json())
  .then(json => displayFolders(json));
};

document.getElementById("folder-submit").addEventListener("click", () => {
  const folderName = document.getElementById("folder-input").value;
  fetch("http://localhost:3000/folders", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({folderName})
  })
    .then(res => res.json())
    .then(json => displayFolders(json));
});

document.getElementById("folder-section").addEventListener("click", (event) => {
  const folderListHTML = event.target.parentNode.children;
  if (event.target.id !== "folder-section") {
    for(let i=0; folderListHTML.length>i; i++){
      if(folderListHTML[i].innerHTML === event.target.innerHTML){
        folderListHTML[i].classList.add("selected");
      } else {
        folderListHTML[i].classList.remove("selected")
      }
    }
  }
});

const displayFolders = (data) => {
  const displayFolderNames = data.folders.map(folder => {
    for(key in folder){
      return `<div class="folder" >${key}</div>`;
    };
  });
  document.getElementById("folder-section").innerHTML = displayFolderNames.join("");
};
