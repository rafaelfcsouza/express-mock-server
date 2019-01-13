var express = require('express');
var fs = require('fs');

var app = express();
let path;

var buildRoute = (config) => {
  return (req, res, next) => {
    if (config) {
      res.status(config.status ? config.status : 200);
      res.json(config.body ? config.body : '');
    } else {
      res.status(501);
      res.end()
    }
  }
};

if (process.argv.length <= 2) {
  path = "./routes";
} else {
  path = process.argv[2];
}

console.log("Reading files from "+ path +"..."); 


fs.readdir(path, function(err, items) {

  if (items) {
    var requests = items
    .filter((item) => { return item.endsWith(".json") })
    .map((item) => {
      return new Promise((resolve) => {
        var routeConfig = JSON.parse(fs.readFileSync(path + "/" + item));

        app.route(routeConfig.path)
          .get(buildRoute(routeConfig.get))
          .post(buildRoute(routeConfig.post))
          .put(buildRoute(routeConfig.put))
          .delete(buildRoute(routeConfig.delete))

        resolve();
      })
    });  

    Promise.all(requests)
      .then(() => { 
        console.log("Listening on port 5000");
        app.listen(5000); 
      })
      .catch((error) => { console.error(error) });
  } else {
    console.error("Directory " + path + " is empty");
  }
});

