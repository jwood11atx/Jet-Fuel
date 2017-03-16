const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const md5 = require("js-md5");

const app = express();

app.use(express.static(__dirname + "/app"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.locals.folders = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.get("/folders", (req, res) => {
  res.json({folders: app.locals.folders});
});

app.post("/folders", (req, res) => {
  const {name} = req.body;
  app.locals.folders.push({
    id: md5(name),
    name,
    urls:[],
  });
  res.json({folders: app.locals.folders});
});

app.get("/folders/:id", (req, res) => {
  const {id} = req.params;
  const folder = findFolder(id);
  res.json(folder);
});

app.post("/folders/:id", (req, res) => {
  const {id} = req.params;
  const {url, websiteName} = req.body;
  const folder = findFolder(id);
  const short_url = md5(url).split("").splice(0,8).join("");
  folder.urls.push({url,
                    short_url,
                    websiteName,
                    views: 0,
                    timestamp: Date.now()});
  res.json(folder);
});

app.patch("/folders/:id", (req, res) => {
  const {id} = req.params;
  const {viewCount, url} = req.body;
  const folder = findFolder(id);
  folder.urls.forEach(obj => {
    if(obj.short_url === url){
      obj.views = viewCount;
    }
  })
});

app.get("/:short_url", (req, res) => {
  const {short_url} = req.params;
  app.locals.folders.forEach(folder => {
    folder.urls.forEach(url => {
      if(url.short_url === short_url) {
        res.redirect(url.url)
      };
    })
  })
})

const findFolder = (id) => {
  const folder = app.locals.folders.find(folder => folder.id == id);
  return folder;
};

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`server up, listening at port:3000`);
});
