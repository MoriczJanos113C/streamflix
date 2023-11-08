//telepítés
//npm init, npm i express, npm i cors, mysql
//indítás: node index.js

//modulok
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

//It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//enable the express server to respond to preflight requests
app.use(cors());

//creating database connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "streamflix",
});

//lekérések
//összes film lekérése
app.get("/movies", (req,res) => {
    db.query("SELECT * FROM filmek", (err, result) => {
        if(result) {
            res.send(result);
        } else {
            res.send({message: "Not found any movies"});
        }
    });
});

//egy film lekérése
app.get("/movies/:film_id", (req, res) => {
    db.query(
        "SELECT * FROM filmek WHERE film_id = ?",
        req.params.film_id,
        (err, result) => {
            if (result) {
                res.send(result);
            } else {
                res.send({
                    message: "Not found any movie",
                });
            }
        }
    );
});

app.listen(8080, () => {
    console.log("running server");
});