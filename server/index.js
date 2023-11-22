//telepítés
//npm init, npm i express, npm i cors, mysql
//indítás: node index.js

//modulok
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { nanoid } = require("nanoid");
const mime = require("mime-types");

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


//setting up where to upload the files
app.use(express.static("./images"));

//image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        let id = nanoid();
        let ext = mime.extension(file.mimetype);
        cb(null, `${id}.${ext}`);
    },
});
const upload = multer({ storage: storage });

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
    const role = req.body.role;
    const hashedPass = bcrypt.hashSync(jelszo, bcrypt.genSaltSync(10));

    db.query(
        "SELECT * FROM felhasznalok WHERE felhasznalonev = ? OR email = ?",
        [felhasznalonev, email],
        (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                db.query(
                    "INSERT INTO felhasznalok (felhasznalonev, email, jelszo, role) VALUES (?, ?, ?, 'felhasználó')",
                    [felhasznalonev, email, hashedPass, role],
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
    const film_id = req.body.film_id;
    const velemenyLeirasa = req.body.velemenyLeirasa;
    const velemenyErtekeles = req.body.velemenyErtekeles;
    const felhasznaloNeve = req.body.felhasznaloNeve;
    const velemenyDatuma = req.body.velemenyDatuma;

    db.query(
        "INSERT INTO velemenyek (felh_id, film_id, velemenyLeirasa, velemenyErtekeles, felhasznaloNeve, velemenyDatuma) VALUES (?, ?, ?, ?, ?, ?)",
        [felh_id, film_id, velemenyLeirasa, velemenyErtekeles, felhasznaloNeve, velemenyDatuma],
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

//will give a review/reviews for a product
app.get("/velemenyek/:id", (req, res) => {
    db.query(
        "SELECT * FROM velemenyek WHERE film_id = ?",
        req.params.id,
        (err, result) => {
            if (result) {
                res.send(result);
            } else {
                res.send({
                    message: "Not found any review for this product",
                });
            }
        }
    );
});

//film vélemények
app.post("/kedvencek", upload.single('file'), (req, res) => {
    const felh_id = req.body.felh_id;
    const film_id = req.body.film_id;
    const film_neve = req.body.film_neve;
    const film_kep = req.body.film_kep;

    db.query(
        "INSERT INTO kedvencek (felh_id, film_id, film_neve, film_kep) VALUES (?, ?, ?, ?)",
        [felh_id, film_id, film_neve, film_kep],
        (err, result) => {
            if (err) throw err;
            if (result) {
                res.send({ message: "Kedvenc hozzáadva" });
            } else {
                res.send({
                    message: "Kedvenc nem lett hozzáadva",
                });
            }
        }
    );
});

//kedvencek a felhasználónak
app.get("/kedvencek/:felh_id", (req, res) => {
    db.query(
        "SELECT * FROM kedvencek WHERE felh_id = ?",
        [req.params.felh_id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({
                    message: "Internal server error",
                });
                return;
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({
                    message: "Not found any movie",
                });
            }
        }
    );
});

//kedvenc törlése
app.delete("/kedvencek/:kedvenc_id", (req, res) => {
    db.query(
        `DELETE FROM kedvencek WHERE kedvenc_id = ${req.params.kedvenc_id}`,
        (err, result) => {
            if (result) {
                res.send({
                    message: "Deleted a favourite film",
                });
            } else {
                res.send({
                    message: "Not deleted any favourite film",
                });
            }
        }
    );
});

app.delete("/movies/:film_id", (req, res) => {
    db.query(
        `DELETE FROM filmek WHERE film_id = ${req.params.film_id}`,
        (err, result) => {
            if (result) {
                res.send({
                    message: "Deleted a film",
                });
            } else {
                res.send({
                    message: "Not deleted any film",
                });
            }
        }
    );
});

//create a movie
app.post("/movies", upload.single("file"), (req, res) => {
    const film_neve = req.body.film_neve;
    const film_hossz = req.body.film_hossz;
    const film_kategoria = req.body.film_kategoria;
    const film_kep = req.file.filename;

    db.query(
        `INSERT INTO filmek (film_neve, film_hossz, film_kategoria, film_kep)  VALUES (?, ?, ?, ?)`,
        [film_neve, film_hossz, film_kategoria, film_kep],
        (err, result) => {
            if (err) throw err;
            if (result) {
                res.send(result);
            } else {
                res.send({
                    message: "Not added a movie",
                });
            }
        }
    );
});



app.listen(8080, () => {
    console.log("running server");
});