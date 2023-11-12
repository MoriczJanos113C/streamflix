import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import {
    Container,
    Button,
    Form
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";
import { format } from 'date-fns';

const DEFAULT_FORM_OBJECT = {
    velemenyErtekeles: "",
    velemenyLeirasa: "",
};

export function MoviePage() {

    const navigate = useNavigate();

    const [movie, setMovie] = useState([]);
    const { id: movieID } = useParams();

    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);

    const [reviews, setReviews] = useState([]);

    const { user } = useContext(UserContext);

    const [reviewByProduct, setReviewByProduct] = useState([]);
    const { id: reviewID } = useParams();

    const [ratingError, setRatingError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const isLoggedIn = useIsLoggedIn();
    //getting one product
    useEffect(() => {
        const fetchProduct = async () => {
            const { data: movie } = await axios.get(
                `http://localhost:8080/movies/${movieID}`
            );
            setMovie(movie);
        };
        fetchProduct();
    }, [movieID]);

    //getting the reviews what the product have by calling the review's id
    useEffect(() => {
        const fetchProduct = async () => {
            const { data: review } = await axios.get(
                `http://localhost:8080/velemenyek/${reviewID}`
            );
            setReviewByProduct(review);
        };
        fetchProduct();
    }, [reviewID]);

    //to add a review for a product, and its sending the user's id, username too
    const addReview = async (e) => {
        e.preventDefault();
        if (
            ratingError === "" &&
            descriptionError === "" &&
            form.velemenyErtekeles.trim() != "" &&
            form.velemenyLeirasa.trim() != ""
        ) {
            const { data: reviews } = await axios.post(
                "http://localhost:8080/velemenyek",
                {
                    film_id: movieID,
                    felh_id: user.felh_id,
                    username: user.felhasznaloNeve,
                    velemenyLeirasa: form.velemenyLeirasa,
                    velemenyErtekeles: form.velemenyErtekeles,
                    felhasznaloNeve: user.felhasznalonev,
                    velemenyDatuma: format(new Date(), 'yyyy-MM-dd')
                }
            );
            setReviews(reviews.id);
            window.location.reload();
        }
    };


    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    //validation for the form
    const checkValid = () => {
        if (
            !String(form.velemenyErtekeles).match(/^[1-5]{1,1}$/) &&
            form.velemenyErtekeles.trim() != ""
        )
            setRatingError("Nem megfelelő értékelés");
        else {
            setRatingError("");
        }

        if (
            !String(form.velemenyLeirasa).match(
                /^[a-zA-Z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!]{5,}$/
            ) &&
            form.velemenyLeirasa.trim() != ""
        )
            setDescriptionError("Nem megfelelő vélemény");
        else {
            setDescriptionError("");
        }
    };


    useEffect(() => {
        checkValid();
    }, [form]);

    const addFavourites = async () => {
        const felh_id = user.id; // Felhasználó azonosítója, például a bejelentkezett felhasználóé
        const movie_id = movie.movieID;
      
        try {
          // Küldj POST kérést az adatbázisba
          const response = await axios.post('/kedvencek', { felh_id, movie_id });
      
          if (response.data.message === 'Sikeres hozzáadás') {
            console.log('A film hozzá lett adva a kedvencekhez.');
      
            // Navigálás a "/kedvencek"-re
            window.location.href = '/kedvencek';
          } else {
            console.log('Hiba a kedvencekhez adás során.');
          }
        } catch (error) {
          console.error('Hiba a kérés során:', error);
        }
      };

      const velemenyCardStyle = {
        background: "#808080",
        color: "white",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        width: "300px",
        display: "inline-block",
    };

    const pageStyle = {
        background: "black",
        color: "white", 
        padding: "40px",
        minHeight: "100vh",
    };

    return (
        <div className="" style={pageStyle}>
            {movie.map((m) => (
                <div className="" key={m.film_id}>
                    <h1>{m.film_neve}</h1>
                    <Button onSubmit={addFavourites} style={{ backgroundColor: '#FF0000', color: '#ffffff' }}>Kedvencekhez adás</Button>
                </div>
            ))}
            <br></br><br></br><br></br>
    <div className="" >
                
    </div>    
<div className="" style={velemenyCardStyle}>
<Container>
<h1>vélemény írása:</h1>
                {isLoggedIn && (
                    <Form onSubmit={addReview}>
                        <Form.Group className="mb-3">
                            <Form.Label>Értékelés</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("velemenyErtekeles")}
                                value={form.velemenyErtekeles}
                                placeholder="Értékelés pontszám szerint (1-5)"
                            />
                        </Form.Group>
                        {ratingError && <p>{ratingError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Termék vélemény írás</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("velemenyLeirasa")}
                                value={form.velemenyLeirasa}
                                placeholder="Leírás"
                            />
                        </Form.Group>
                        {descriptionError && <p>{descriptionError}</p>}
                        <Button className="reviewBtn" type="submit" style={{ backgroundColor: '#FFA500', color: '#ffffff' }}>
                            Vélemény elküldése
                        </Button>
                    </Form>
                )}
            </Container>
    
</div>

<div className="">
            {reviewByProduct.map((pR) => (
                        <div key={pR.id}>
                           

                            <h1>{pR.felhasznaloNeve}</h1>
                            <h2>{pR.velemenyErtekeles}</h2>
                            <p>{pR.velemenyLeirasa}</p>
                            <p>{pR.velemenyDatuma}</p>
                        </div>
                    ))}
            </div>

        </div>
        
    )
}