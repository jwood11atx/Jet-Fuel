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
    .catch((err) => console.log("something went wrong!"))
});

app.post("/folders", (req, res) => {
  const {name} = req.body;
  const folder = {
    folder_name: name,
    created_at: new Date
  }
  database("folders").insert(folder)
    .then(() => {
      database("folders").select()
        .then(folders => res.status(200).json(folders))
        .catch(err => console.log("something went wrong!"));
    })
});

app.get("/folders/:id", (req, res) => {
  const {id} = req.params;
  database("urls").where("folder_id", id).select()
    .then(urls => res.status(200).json(urls))
    .catch(err => console.log("something went wrong!"));
});

app.post("/folders/:id", (req, res) => {
  const {id} = req.params;
  const {url, websiteName} = req.body;
  const short_url = md5(url).split("").splice(0,8).join("");
  const urlObj = {
    url,
    short_url,
    website_name: websiteName,
    views: 0,
    folder_id: id,
    created_at: new Date()
  };
  database("urls").insert(urlObj)
    .then(() => {
      database("urls").where("folder_id", id).select()
        .then(urls => res.status(200).json(urls))
        .catch(err => console.log("something went wrong!"));
    })
});

app.patch("/folders/:id", (req, res) => {
  const {id} = req.params;
  const {viewCount, shortUrl} = req.body;
  database("urls").where("short_url", shortUrl)
    .update({views: viewCount})
    .finally()
});

app.get("/:short_url", (req, res) => {
  const {short_url} = req.params;
  database("urls").where("short_url", short_url).select()
    .then(urlArr => res.status(200).redirect(urlArr[0].url))
    .catch(err => console.log("something went wrong!"));
})

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server up, listening at port:3000`);
});
