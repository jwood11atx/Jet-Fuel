const {expect} = require("chai");

const {displayErrMsg} = require("../app/helper/folders.js");

describe("folders helper functions", () => {
  const message = "test error msg";
  it("exists?", () => {
    expect(displayErrMsg(message)).to.equal(message);
  })
})
