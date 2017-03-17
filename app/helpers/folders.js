const createFolder = () => {
  const name = document.getElementById("folder-input").value;
  if(!folderCheck(name, $folderList)){
    postFolder(name).then(json => displayFolders(json));
  }
};

const folderCheck = (folderName, folderList) => {
  if (folderList.length !== 0) {
    for(let i=0; folderList.length>i; i++){
      if (folderList[i].innerHTML === folderName) {
        displayErrMsg("folder name already in use", $errMsg)
        return true;
      }
    };
  }
  displayErrMsg("", $errMsg);
  return false;
};

const selectFolder = (event) => {
  if (event.target.classList.value !== "folder-section"){
    matchFolder(event);
  }
};

const matchFolder = (event) => {
  for(let i=0; $folderList.length>i; i++){
    const folderName = $folderList[i].innerHTML;
    if(folderName === event.target.innerHTML){
      selected = {folderName, id: event.target.id};
      getURLs().then(json => displayURLs(json));
      displayURLinput(folderName);
    }
  };
};

const displayFolders = (data) => {
  const displayFolderNames = data.map(folder => {
    return `<div id=${folder.id} class="folder">${folder.folder_name}</div>`;
  });
  $folderSection.innerHTML = displayFolderNames.join("");
  reselectFolder();
};

const reselectFolder = () => {
  for(let i=0; $folderList.length>i; i++){
    const folder = $folderList[i];
    const folderClass = folder.classList;

    if(folder.innerHTML === selected.folderName){
      folderClass.add("selected");
    } else {
      folderClass.remove("selected");
    }
  };
};

const displayErrMsg = (message, errMsg) => {
  errMsg.innerHTML = message;
};

if(typeof module !== 'undefined') {
  module.exports = {selectFolder, matchFolder, createFolder, folderCheck, displayFolders, reselectFolder, displayErrMsg};
};
