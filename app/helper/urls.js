const getURLs = (folderID) => {
  fetch(`http://localhost:3000/folders/${folderID}`)
    .then(res => res.json())
    .then(json => {
      displayURLs(json)
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
