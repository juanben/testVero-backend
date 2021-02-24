var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config.json");


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.post("/auth", function (req, res) {
    query = "select * from USER where Code = ? and state = 0";

    let user = [req.body.code];

    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query, user, function (err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});
module.exports = router;