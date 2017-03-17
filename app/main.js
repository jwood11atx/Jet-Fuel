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

//create new folder
$folderSubmit.addEventListener("click", () => {
  createFolder();
});

//select a folder
$folderSection.addEventListener("click", (event) => {
  viewSort = "up";
  selectFolder(event);
});

//add a url to folder
$urlInputSection.addEventListener("click", (event) => {
  if(event.target.id === "url-submit"){
    const url = cleanUrl(document.getElementById("url-input").value);
    const id = document.querySelector(".selected").id;
    const websiteName = document.getElementById("website-name-input").value;
    postURL(id, url, websiteName).then(json => {
      urlList = json;
      displayURLs(json);
    });
  }
});

//visit url and increase view count
$urls.addEventListener("click", (event) => {
  if(event.target.classList.value === "url"){
    const $views = event.target
                        .closest(".url-container")
                        .querySelector(".views");
    const viewCount = Number($views.innerHTML) + 1;
    const urlID = event.target.id;
    $views.innerHTML = viewCount;
    patchURL(urlID, "views", viewCount);
  }
});

//sort urls by views
$urlInputSection.addEventListener("click", (event) => {
  if(event.target.id === "sort-views"){
    getURLs().then(json => {
      sortUrls(json, "views");
      displayURLs(json);
    });
  }
});

//sort urls by date
$urlInputSection.addEventListener("click", (event) => {
  if(event.target.id === "sort-date"){
    getURLs().then(json => {
      convertDate(json);
      sortUrls(json, "created_at");
      displayURLs(json);
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
