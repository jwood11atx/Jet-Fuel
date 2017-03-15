const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/app"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.locals.folder = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.post("/folders", (req, res) => {
  app.locals.folder.push({name: req.body.folderName, urls:{}});
  res.json({folders: app.locals.folder});
});

app.get("/folders", (req, res) => {
  res.json({folders: app.locals.folder});
});

app.get("/folders/:id", (req, res) => {
  const name = req.params.id
  const folder = app.locals.folder.find(folder => folder.name === name)
  res.json(folder);
})

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server up, listening at port:3000`);
});
