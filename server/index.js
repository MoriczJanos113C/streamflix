//telepítés
//npm init, npm i express, npm i cors, mysql
//indítás: node index.js

//modulok
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

//regisztrálás
app.post("/register", async (req, res) => {
    const felhasznalonev = req.body.felhasznalonev;
    const email = req.body.email;
    const jelszo = req.body.jelszo;
    const hashedPass = bcrypt.hashSync(jelszo, bcrypt.genSaltSync(10));

    db.query(
        "SELECT * FROM felhasznalok WHERE felhasznalonev = ? OR email = ?",
        [felhasznalonev, email],
        (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                db.query(
                    "INSERT INTO felhasznalok (felhasznalonev, email, jelszo) VALUES (?, ?, ?)",
                    [felhasznalonev, email, hashedPass],
                    (err, Rresult) => {
                        if (err) throw err;
                        res.status(201).send();
                    }
                );
            } else {
                res.send({
                    message: "Felhasználónév vagy email foglalt",
                });
            }
        }
    );
});

//bejelentkezés
app.post("/login", (req, res) => {
    const { felhasznalonev, jelszo } = req.body;

    db.query(
        "SELECT * FROM felhasznalok WHERE felhasznalonev = ?",
        [felhasznalonev],
        (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                const token = jwt.sign(felhasznalonev, "secret-password");
                if (bcrypt.compareSync(jelszo, result[0].jelszo)) {
                    res.send(
                        JSON.stringify({
                            token: token,
                            user: result[0],
                        })
                    );
                } else {
                    res.send({
                        message: "Rossz jelszó",
                    });
                }
            } else {
                res.send({
                    message: "Rossz felhasználónév",
                });
            }
        }
    );
});

//film vélemények
app.post("/velemenyek", async (req, res) => {
    const felh_id = req.body.felh_id;
    const film_id = req.body.product_id;
    const velemenyLeirasa = req.body.velemenyLeirasa;
    const ertekeles = req.body.ertekeles;
    const felhasznaloNeve = req.body.felhasznaloNeve;
    const velemenyDatuma = req.body.velemenyDatuma;

    db.query(
        "INSERT INTO velemenyek (felh_id, film_id, velemenyLeirasa, ertekeles, felhasznaloNeve, velemenyDatuma) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, product_id, description, rating, username],
        (err, result) => {
            if (err) throw err;
            if (result) {
                res.send({ message: "Értékelés hozzáadva" });
            } else {
                res.send({
                    message: "Értékelés nem lett hozzáadva",
                });
            }
        }
    );
});

app.listen(8080, () => {
    console.log("running server");
});