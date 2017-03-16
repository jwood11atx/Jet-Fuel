const {expect} = require("chai");

const {displayErrMsg} = require("../app/helper/folders.js");

describe("folders helper functions", () => {
  it("exists?", () => {
    errMsg = {innerHTML: ""};
    const message = "test error msg";
    displayErrMsg(message, errMsg);
    expect(errMsg.innerHTML).to.equal(message);
  });
});
