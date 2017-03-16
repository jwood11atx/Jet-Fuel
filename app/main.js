const $folderList = document.getElementsByClassName("folder");
const $folderSection = document.getElementById("folder-section");
const $folderSubmit = document.getElementById("folder-submit");
const $urlInputSection = document.getElementById("url-input-section");
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

const selectFolder = (event) => {
  if (event.target.id !== "folder-section")
    matchFolder(event);
};

const matchFolder = (event) => {
  const folderListHTML = event.target.parentNode.children;
  for(let i=0; folderListHTML.length>i; i++){
    const folderName = folderListHTML[i].innerHTML;
    if(folderName === event.target.innerHTML){
      selected = folderName;
      getURLs(event.target.id);
      displayURLinput(folderName)
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
    console.log(folder);
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

const getURLs = (folderID) => {
  fetch(`http://localhost:3000/folders/${folderID}`)
    .then(res => res.json())
    .then(json => {
      console.log("hello?");
    //   console.log(json);
    //   // displayURLs(json)
    });
};

const displayURLs = (data) => {
  console.log(data);
  const urls = data.urls.map(urlObj => {
    return `<div class="url">${urlObj.short_url}</div>`;
  });
  document.getElementById("urls").innerHTML = urls.join("");
};

const displayURLinput = (folderName) => {
  $urlInputSection.innerHTML = `
    <h2 id="folder">${folderName}</h2>
    Enter URL to shorten: <input type="text"
                                 id="url-input"
                                 name="url-input"
                                 placeholder="enter url">
    <button id="url-submit">submit</button>

    `;
}
