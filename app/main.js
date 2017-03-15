window.onload = () => {
  fetch("http://localhost:3000/folders")
  .then(res => res.json())
  .then(json => {
    let displayFolderNames = json.folders.map(folder => {
      for(key in folder){
        return `<article>${key}</article>`;
      }
    });
    document.getElementById("right-section").innerHTML = displayFolderNames.join("");
  });
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
    .then(json => {
      let displayFolderNames = json.folders.map(folder => {
        for(key in folder){
          return `<article>${key}</article>`;
        }
      });
      document.getElementById("right-section").innerHTML = displayFolderNames.join("");
    });
});
