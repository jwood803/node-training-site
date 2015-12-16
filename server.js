var express = require("express"),
  bodyParser = require("body-parser"),
  request = require("request");

var app = express();

var apiHost = "https://api.viddler.com/api/v2/";

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");

app.use(bodyParser.json({limit: "50mb"}));

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));

app.get("/auth", function(req, res) {
  var authForwardingApi = apiHost + "viddler.users.auth.json";

  request.get({ uri: authForwardingApi, qs: { username: req.query.username, password: req.query.password, api_key: req.query.api_key } },
    function(error, response, body) {
      res.send(JSON.parse(body));
  });
  
});

app.get("/prepare", function(req, res) {
  var prepareUploadForwardingApi = apiHost + "viddler.videos.prepareUpload.json";
  
  request.get({ uri: prepareUploadForwardingApi, qs: {api_key: req.query.api_key, sessionid: req.query.sessionid } },
    function(error, response, body) {
      res.send(JSON.parse(body));
    });
});

app.post("/upload", function(req, res) {
    var uploadForwardingApi = req.body.params.endpoint;
    var files = req.body.params.files;
    
    request.post({uri: uploadForwardingApi, qs: { api_key: req.body.params.api_key, token: req.body.params.token }, formData: { files: files }},
      function(error, response, body) {
        if(error) {
          res.send(JSON.parse(error));
        }
        
        res.send(body);
      });

});

app.get("*", function (req, res) {
  res.render("index");
});

app.listen(process.env.PORT);