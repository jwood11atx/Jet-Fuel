const {expect} = require("chai");

const {convertDate, cleanUrl, displayErrMsg} = require("../app/helpers/util.js");

describe("helpers/util.js", () => {
  describe("convertDate", () => {
    it("should convert date into miliseconds from UTC", () => {
      const date1 = new Date();
      const date2 = new Date();
      const data = [
        {created_at: date1},
        {created_at: date2}
      ];
      const expected = [
        {created_at: date1.getTime()},
        {created_at: date2.getTime()}
      ];
      expect(convertDate(data)).to.eql(expected);
    });
  });

  describe("cleanUrl", () => {
    it("should add http:// if url doesn't have it", () => {
      const url = "reddit.com";
      const expected = "http://reddit.com";
      expect(cleanUrl(url)).to.equal(expected);
    });

    it("should return the original url if it contains http://", () => {
      const url = "http://www.reddit.com";
      expect(cleanUrl(url)).to.equal(url);
    });

    it("should return original url if it contains https://", () => {
      const url = "https://reddit.com";
      expect(cleanUrl(url)).to.equal(url);
    });
  });

  describe("displayErrMsg", () => {
    it("should report an error message", () => {
      const errMsg = {innerHTML: ""};
      const message = "test error msg";
      displayErrMsg(message, errMsg);
      expect(errMsg.innerHTML).to.equal(message);
    });
  });
});
