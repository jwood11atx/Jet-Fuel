const {expect} = require("chai");

const {displayErrMsg} = require("../app/helpers/folders.js");

describe("folders helper functions", () => {
  it("exists?", () => {
    const errMsg = {innerHTML: ""};
    const message = "test error msg";
    displayErrMsg(message, errMsg);
    expect(errMsg.innerHTML).to.equal(message);
  });
});
