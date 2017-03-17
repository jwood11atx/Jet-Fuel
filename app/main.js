const $folderList = document.getElementsByClassName("folder");
const $folderSection = document.getElementById("folder-section");
const $folderSubmit = document.getElementById("folder-submit");
const $urlInputSection = document.getElementById("url-input-section");
const $urls = document.getElementById("urls");
const $errMsg = document.getElementById("folder-error");
let selected = {};
let urlList = [];
let viewSort = "up";

window.onload = () => {
  getFolders().then(json => {
    if (json.length !== 0) displayFolders(json);
  });
};

$folderSubmit.addEventListener("click", () => {
  createFolder();
});

$folderSection.addEventListener("click", (event) => {
  viewSort = "up";
  selectFolder(event);
  reselectFolder();
});

$urlInputSection.addEventListener("click", (event) => {
  if(event.target.id === "url-submit"){
    const url = document.getElementById("url-input").value;
    const id = document.querySelector(".selected").id;
    const websiteName = document.getElementById("website-name-input").value;
    postURL(id, url, websiteName).then(json => {
      urlList = json;
      displayURLs(json);
    });
  }
});

//REFACTOR THIS!!//------------------------------------
$urls.addEventListener("click", (event) => {
  if(event.target.classList.value === "url"){
    const $views = event.target
                        .closest(".url-container")
                        .querySelector(".views");
    const viewCount = Number($views.innerHTML) + 1;
    const urlID = event.target.id;

    $views.innerHTML = viewCount;
    patchURL(viewCount, urlID);
  }
});

$urlInputSection.addEventListener("click", (event) => {
  if(event.target.id === "sort-views"){
    fetch(`http://localhost:3000/folders/${selected.id}`)
      .then(res => res.json())
      .then(json => {
        const sortedUrls = sortUrls(json, "views")
        displayURLs(json);
      })
  }
});

$urlInputSection.addEventListener("click", (event) => {
  if(event.target.id === "sort-date"){
    fetch(`http://localhost:3000/folders/${selected.id}`)
      .then(res => res.json())
      .then(json => {
        json = json.map(urlObj => {
          urlObj.created_at = new Date(urlObj.created_at).getTime();
          return urlObj;
        });
        const sortedUrls = sortUrls(json, "created_at")
        displayURLs(json);
      })
  }
});



if(typeof module !== 'undefined') {
  module.exports = {$folderList,
                    $folderSection,
                    $folderSubmit,
                    $urlInputSection
  };
};
