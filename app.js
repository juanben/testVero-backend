var conf=require("config.json") ;
const express = require("express");
const app = express();
const port = conf.port;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", " GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

console.log("Código realizado por "+conf.modificador)
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//Users
var users = require("./routes/users");
app.use("/api/users", users);

//Games
var score = require("./routes/score");
app.use("/api/score", score);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

