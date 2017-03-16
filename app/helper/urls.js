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
    const timestamp = new Date(urlObj.timestamp);
    return (`
      <div class="url">
        ${urlObj.short_url}
        <span>${urlObj.views}</span>
        <span>${timestamp.getMonth()}/${timestamp.getFullYear().toString().slice(1,3)}</span>
      </div>
      `);
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
    <div>
      Sort by:
      <button id="sort-views">views</button>
      <button id="sort-date">date</button>
    </div>


    `;
}
