process.env.NODE_ENV = "test";

const chaiHttp = require("chai-http");
const chai = require("chai");
const {expect} = require("chai");
const knex = require("../db/knex.js");
const app = require("../server.js");

chai.use(chaiHttp);

const {selectFolder, createFolder, folderCheck, displayFolders, reselectFolder} = require("../app/helpers/api.js");

describe("helpers/api.js / Server", () => {
  let date;

  beforeEach(function(done) {
  knex.migrate.rollback()
  .then(function() {
    knex.migrate.latest()
    .then(function() {
      return knex.seed.run()
      .then(function() {
        done();
      });
    });
  });
});

afterEach(function(done) {
  knex.migrate.rollback()
  .then(function() {
    done();
  });
});

  describe("GET on page load ", () => {
    it("should fetch index.html", (done) => {
      chai.request(app)
        .get("/")
        .end((err, res) => {
          if(err) {done(err)};
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        });
    });
  });

  describe("getFolder /folders/id", () => {
    it("should fetch a single folder", (done) => {
      chai.request(app)
        .get("/folders/1")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(1);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("folder_name");
          expect(res.body[0]).to.have.property("created_at");
          expect(res.body[0]).to.have.property("updated_at");
          expect(res.body[0].id).to.equal(1);
          expect(res.body[0].folder_name).to.equal("shopping");
          expect(res.body[0].updated_at).to.equal(null);
        done();
      });
    });
  });

  describe("getFolders /folders", () => {
    it("should fetch all folders", (done) => {
      chai.request(app)
        .get("/folders")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(1);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("folder_name");
          expect(res.body[0]).to.have.property("created_at");
          expect(res.body[0]).to.have.property("updated_at");
          expect(res.body[0].id).to.equal(1);
          expect(res.body[0].folder_name).to.equal("shopping");
          expect(res.body[0].updated_at).to.equal(null);
        done();
      });
    });
  });

  describe("postFolder /folders", () => {
    it("should create a new folder", (done) => {
      chai.request(app)
        .post("/folders")
        .send({folder_name: "social media"})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          expect(res.body[1]).to.have.property("id");
          expect(res.body[1]).to.have.property("folder_name");
          expect(res.body[1]).to.have.property("created_at");
          expect(res.body[1]).to.have.property("updated_at");
          expect(res.body[1].id).to.equal(2);
          expect(res.body[1].folder_name).to.equal("social media");
          expect(res.body[1].updated_at).to.equal(null);
        done();
      });
    });
  });

  describe("getURLs /folders/id/urls", () => {
    it("should fetch all urls from a folder", (done) => {
      chai.request(app)
        .get("/folders/1/urls")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          expect(res.body[0]).to.have.property("id");
          expect(res.body[0]).to.have.property("website_name");
          expect(res.body[0]).to.have.property("url");
          expect(res.body[0]).to.have.property("short_url");
          expect(res.body[0]).to.have.property("views");
          expect(res.body[0]).to.have.property("folder_id");
          expect(res.body[0]).to.have.property("created_at");
          expect(res.body[0].id).to.equal(1);
          expect(res.body[0].website_name).to.equal("amazon");
          expect(res.body[0].url).to.equal("http://amazon.com");
          expect(res.body[0].short_url).to.equal("45b2256e");
          expect(res.body[0].views).to.equal(3);
          expect(res.body[0].folder_id).to.equal(1);
          expect(res.body[0].updated_at).to.equal(null);
        done();
      });
    });
  });

});
