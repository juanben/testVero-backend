var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../config.json");


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.post("/:id", async function (req, res) {
    query = "insert into SCORE ( idUSER, R, O, P, A,E,IGAP,ICI,time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    let user = [
        req.params.id,
        req.body.R,
        req.body.O,
        req.body.P,
        req.body.A,
        req.body.E,
        req.body.IGAP,
        req.body.ICI,
        req.body.time
    ];

    var connection = mysql.createConnection(config.connection);
    connection.connect();
    let promise = new Promise((resolve) => {
        connection.query(query, user, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows)
        });
    });
    await promise
    let query2 = "update USER  set state = 1  where idUSER = ?";
    let data = [req.params.id];
    connection.query(query2, data, function (err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});
module.exports = router;