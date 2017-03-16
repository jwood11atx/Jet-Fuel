const selectFolder = (event) => {
  if (event.target.id !== "folder-section")
    matchFolder(event);
};

const matchFolder = (event) => {
  for(let i=0; $folderList.length>i; i++){
    const folderName = $folderList[i].innerHTML;
    if(folderName === event.target.innerHTML){
      selected = folderName;
      getURLs(event.target.id);
      displayURLinput(folderName);
    }
  }
}

const createFolder = () => {
  const name = document.getElementById("folder-input").value;
  if(!folderCheck(name)){
    fetch("http://localhost:3000/folders", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name})
    })
      .then(res => res.json())
      .then(json => displayFolders(json));
  }
};

const folderCheck = (folderName) => {
  if ($folderList.length !== 0) {
    for(let i=0; $folderList.length>i; i++){
      if ($folderList[i].innerHTML === folderName) {
        displayErrMsg("folder name already in use")
        return true;
      }
    }
  }
  displayErrMsg("");
  return false;
};

const displayFolders = (data) => {
  const displayFolderNames = data.folders.map(folder => {
    return `<div id=${folder.id} class="folder">${folder.name}</div>`;
  });
  $folderSection.innerHTML = displayFolderNames.join("");
  reselectFolder();
};

const reselectFolder = () => {
  for(let i=0; $folderList.length>i; i++){
    const folder = $folderList[i];
    const folderClass = folder.classList;

    if(folder.innerHTML === selected){
      folderClass.add("selected");
    } else {
      folderClass.remove("selected");
    }
  }
};

const displayErrMsg = (message) => {
  const errMsg = document.getElementById("folder-error");
  errMsg.innerHTML = message;
};

if(typeof module !== 'undefined') {
  module.exports = {selectFolder, matchFolder, createFolder, folderCheck, displayFolders, reselectFolder, displayErrMsg};
};
