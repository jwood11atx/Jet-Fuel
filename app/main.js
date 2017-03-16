const $folderList = document.getElementsByClassName("folder");
const $folderSection = document.getElementById("folder-section");
const $folderSubmit = document.getElementById("folder-submit");
const $urlInputSection = document.getElementById("url-input-section");
const $urls = document.getElementById("urls");
let selected = {};
let urlList = [];

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
    const websiteName = document.getElementById("website-name-input").value;
    console.log(websiteName);
    fetch(`http://localhost:3000/folders/${id}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url, websiteName})
    })
      .then(res => res.json())
      .then(json => {
        urlList = json.urls;
        displayURLs(json);
      });
  }
});

$urls.addEventListener("click", (event) => {
  if(event.target.classList.value === "url"){
    const $views = event.target.closest(".url-container").querySelector(".views");
    const viewCount = Number($views.innerHTML) + 1
    $views.innerHTML = viewCount;
    const url = event.target.innerHTML;
    fetch(`http://localhost:3000/folders/${selected.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({viewCount, url})
    })
    console.log(urlList);
    urlList.forEach(urlObj => {
      if(url === urlObj.short_url){
        window.open(`${urlObj.url}`, "_blank");
      }
    });
  }
});

if(typeof module !== 'undefined') {
  module.exports = {$folderList,
                    $folderSection,
                    $folderSubmit,
                    $urlInputSection
  };
};
