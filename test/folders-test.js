const {expect} = require("chai");

const {selectFolder, createFolder, folderCheck, displayFolders, reselectFolder} = require("../app/helpers/folders.js");

describe("helpers/folders.js", () => {
  describe("folderCheck", () => {
    const folderList = [{innerHTML:   "social"},
                        {innerHTML: "shopping"}];
    $errMsg = null;
    displayErrMsg = () => {};

    it("should return true if folder already exists", () => {
      const folderName = "shopping";
      expect(folderCheck(folderName, folderList)).to.equal(true);
    });

    it("should return false if folder does not exist", () => {
      const folderName = "boardgames";
      expect(folderCheck(folderName, folderList)).to.equal(false);
    });
  });
});
