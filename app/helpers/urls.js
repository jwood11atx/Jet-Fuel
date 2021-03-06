const displayURLs = (data) => {
  const urls = data.map(urlObj => {
    const timestamp = new Date(urlObj.created_at);
    return (`
      <div class="url-container">
        ${urlObj.website_name}:
        <a id="${urlObj.id}" class="url"href="${urlObj.url}" target="_blank">${urlObj.short_url}</a>
        views: <span class="views">${urlObj.views}</span>
        date: <span class="timestamp">
                ${ timestamp.getMonth() + 1 }/${ timestamp.getDate() }/${ timestamp.getFullYear().toString().slice(2,4) }
              </span>
      </div>
      `);
  });
  $urls.innerHTML = urls.join("");
};

const displayURLinput = () => {
  $urlInputSection.innerHTML = `
    <h2 id="folder-title">${selected.folderName}</h2>
    <div id="url-input-fields">
      Website name:
        <input type="text" id="website-name-input"
                           name="website-name-input"
                           placeholder="name of website">
      URL to shorten:
        <input type="text" id="url-input"
                           name="url-input"
                           placeholder="enter url">
          <button id="url-submit">submit</button>
          <div>
            Sort by:
            <button id="sort-views">views</button>
            <button id="sort-date">date</button>
          </div>
    </div>
    `;
};

const sortUrls = (urlsArr, type) => {
  if(viewSort === "up"){
    viewSort = "down";
    return urlsArr.sort((a,b) => b[type]-a[type]);
  } else {
    viewSort = "up";
    return urlsArr.sort((a,b) => a[type]-b[type]);
  }
};

if(typeof module !== 'undefined') {
  module.exports = {displayURLs, displayURLinput, sortUrls};
};
