const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const md5 = require("js-md5");

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.use(express.static(__dirname + "/app"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.get("/folders", (req, res) => {
  database("folders").select()
    .then((folders) => res.status(200).json(folders))
    .catch((err) => console.log("something went wrong with /folers!"));
});

app.post("/folders", (req, res) => {
  const {folder_name} = req.body;
  const folder = {
    folder_name,
    created_at: new Date
  };
  database("folders").insert(folder)
    .then(() => {
      database("folders").select()
        .then(folders => res.status(200).json(folders))
        .catch(err => console.log("something went wrong with /folders!"));
    });
});

app.get("/folders/:id", (req, res) => {
  const {id} = req.params;
  database("folders").where("id", id).select()
    .then(folder => res.status(200).json(folder))
    .catch(err => console.log("something went wrong with /folders/id!"));
});

app.get("/folders/:id/urls", (req, res) => {
  const {id} = req.params;
  database("urls").where("folder_id", id).select()
    .then(urls => res.status(200).json(urls))
    .catch(err => console.log("something went wrong with folders/id/urls!"));
});

app.post("/folders/:folder_id/urls", (req, res) => {
  const {folder_id} = req.params;
  const {url, website_name} = req.body;
  const short_url = md5(url).split("").splice(0,8).join("");
  const urlObj = { url,
                   short_url,
                   website_name,
                   views: 0,
                   folder_id,
                   created_at: new Date()
                 };

  database("urls").insert(urlObj)
    .then(() => {
      database("urls").where("folder_id", folder_id).select()
        .then(urls => res.status(200).json(urls))
        .catch(err => console.log("something went wrong! /folders/id/urls"));
    });
});

app.patch("/urls/:id", (req, res) => {
  const {id} = req.params;
  const {key, value} = req.body;
  database("urls").where("id", id).select()
    .update({[key]: value})
    .finally();
});

app.get("/:short_url", (req, res) => {
  const {short_url} = req.params;
  if (short_url !== "favicon.ico") {
    database("urls").where("short_url", short_url).select()
    .then(urlArr => res.status(200).redirect(urlArr[0].url))
    .catch(err => console.log("something went wrong! with /short"));
  }
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server up, listening at port:3000`);
});

if (!module) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
};

module.exports = app;
