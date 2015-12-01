var express = require("express");

var env = process.env.NODE_ENV = process.env.NODE_ENV | "dev";

var app = express();

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");

app.get("*", function (req, res) {
    res.render("index");
});

app.listen(process.env.PORT);
console.log("Listening on port " + process.env.PORT);