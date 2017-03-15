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
      const folder = folderListHTML[i];
      const folderName = folder.innerHTML;
      if(folderName === event.target.innerHTML){
        folder.classList.add("selected");
        getURLs(folderName)
      } else {
        folder.classList.remove("selected")
      }
    }
  }
});

const getURLs = (folderName) => {
  fetch(`http://localhost:3000/folders/${folderName}`)
    .then(res => res.json())
    .then(json =>  console.log(json));
}

const displayFolders = (data) => {
  const displayFolderNames = data.folders.map(folder => {
    return `<div class="folder" >${folder.name}</div>`;
  });
  document.getElementById("folder-section").innerHTML = displayFolderNames.join("");
};
