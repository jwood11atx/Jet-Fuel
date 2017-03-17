const {expect} = require("chai");

const {displayURLs, displayURLinput, sortUrls} = require("../app/helpers/urls.js");

describe("helpers/urls.js", () => {
  describe("displayURLs", () => {
    it("should display html filled in with the data", () => {
      $urls = {innerHTML: ""};
      const data = [
        {created_at: new Date(),
          website_name: "reddit",
          id: 7,
          url: "www.reddit.com",
          short_url: "a9we8f6",
          views: "4"},
          {created_at: new Date(),
            website_name: "facebook",
            id: 3,
            url: "www.facebook.com",
            short_url: "iuy4o5y5",
            views: "4"}
          ];
          const expected = `<divclass="url-container">reddit:<aid="7"class="url"href="www.reddit.com"target="_blank">a9we8f6</a>views:<spanclass="views">4</span>date:<spanclass="timestamp">3/17/17</span></div><divclass="url-container">facebook:<aid="3"class="url"href="www.facebook.com"target="_blank">iuy4o5y5</a>views:<spanclass="views">4</span>date:<spanclass="timestamp">3/17/17</span></div>`;

          displayURLs(data);

          $urls.innerHTML = $urls.innerHTML.replace(/\s/g,"");

          expect($urls.innerHTML).to.equal(expected);
    })
  });

  describe("displayURLinput", () => {
    it("should display html filled in with the folder name", () => {
      $urlInputSection = {innerHTML: ""};
      selected = {folderName: "shopping"};
      const expected = `<h2id="folder-title">shopping</h2>Websitename:<inputtype="text"id="website-name-input"name="website-name-input"placeholder="nameofwebsite"><br/>URLtoshorten:<inputtype="text"id="url-input"name="url-input"placeholder="enterurl"><buttonid="url-submit">submit</button><div>Sortby:<buttonid="sort-views">views</button><buttonid="sort-date">date</button></div>`;

      displayURLinput();

      $urlInputSection.innerHTML = $urlInputSection.innerHTML.replace(/\s/g,"");

      expect($urlInputSection.innerHTML).to.equal(expected);
    })
  });
});
