var express = require("express");

var app = express();

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client'));

app.get("*", function (req, res) {
    res.render("index");
});

app.listen(process.env.PORT);