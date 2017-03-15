const folderList = document.getElementsByClassName("folder");
let selected = "";

window.onload = () => {
  fetch("http://localhost:3000/folders")
  .then(res => res.json())
  .then(json => {
    if (json.folders.length !== 0) displayFolders(json);
  });
};

document.getElementById("folder-submit").addEventListener("click", () => {
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
      document.getElementById("folder-error").innerHTML = "";
  } else {
    document.getElementById("folder-error").innerHTML = "folder name already in use";
  }
});

document.getElementById("folder-section").addEventListener("click", (event) => {
  const folderListHTML = event.target.parentNode.children;
  if (event.target.id !== "folder-section") {
    for(let i=0; folderListHTML.length>i; i++){
      const folder = folderListHTML[i];
      const folderName = folder.innerHTML;
      if(folderName === event.target.innerHTML){
        selected = folderName;
        getURLs(folderName);
        selectedFolderCheck();

        document.getElementById("url-input").innerHTML = `
          <h2>${folderName}</h2>
          Enter URL to shorten: <input type="text"
                                       id="url-input"
                                       name="url-input"
                                       placeholder="enter url">
          `;
      }
    }
  }
});

const folderCheck = (folderName) => {
  if (folderList.length !== 0) {
    for(let i=0; folderList.length>i; i++){
      if (folderList[i].innerHTML === folderName) {
        return true;
      }
    }
  }
  return false;
}

const selectedFolderCheck = () => {
  for(let i=0; folderList.length>i; i++){
    const folder = folderList[i];
    const folderClass = folder.classList;

    if(folder.innerHTML === selected){
      folderClass.add("selected");
    } else {
      folderClass.remove("selected");
    }
  }
}

const getURLs = (folderName) => {
  fetch(`http://localhost:3000/folders/${folderName}`)
    .then(res => res.json())
    .then(json =>  console.log(json));
}

const displayFolders = (data) => {
  const displayFolderNames = data.folders.map(folder => {
    return `<div class="folder">${folder.name}</div>`;
  });
  document.getElementById("folder-section").innerHTML = displayFolderNames.join("");
  selectedFolderCheck();
};
