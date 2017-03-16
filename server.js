const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/app"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.locals.folders = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.post("/folders", (req, res) => {
  app.locals.folders.push({id: Date.now(), name: req.body.name, urls:[]});
  res.json({folders: app.locals.folders});
});

app.get("/folders", (req, res) => {
  res.json({folders: app.locals.folders});
});

app.get("/folders/:id", (req, res) => {
  const {id} = req.params;
  const folder = findFolder(id);
  res.json(folder);
})

app.post("/folders/:id", (req, res) => {
  const {id} = req.params;
  const {url} = req.body;
  const folder = findFolder(id);
  folder.urls.push({url, short_url: Date.now()});
  res.json(folder);
})

const findFolder = (id) => {
  const folder = app.locals.folders.find(folder => folder.id == id);
  return folder;
}

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server up, listening at port:3000`);
});
