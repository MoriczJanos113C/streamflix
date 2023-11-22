import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { useIsAdmin } from "../hooks/useIsAdmin";
import {
    Container,
    Button,
    Form
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";
import { format } from 'date-fns';
import { addDays } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const isAdmin = useIsAdmin();
    const [favourites, setFavourites] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            const { data: movie } = await axios.get(
                `http://localhost:8080/movies/${movieID}`
            );
            setMovie(movie);
        };
        fetchMovies();
    }, [movieID]);

    useEffect(() => {
        const fetchReview = async () => {
            const { data: review } = await axios.get(
                `http://localhost:8080/reviews/${reviewID}`
            );
            setReviewByProduct(review);
        };
        fetchReview();
    }, [reviewID]);

    const addReview = async (e) => {
        e.preventDefault();
        if (
            ratingError === "" &&
            descriptionError === "" &&
            form.velemenyErtekeles.trim() != "" &&
            form.velemenyLeirasa.trim() != ""
        ) {
            const { data: reviews } = await axios.post(
                "http://localhost:8080/reviews",
                {
                    film_id: movieID,
                    felh_id: user.felh_id,
                    username: user.felhasznaloNeve,
                    velemenyLeirasa: form.velemenyLeirasa,
                    velemenyErtekeles: form.velemenyErtekeles,
                    felhasznaloNeve: user.felhasznalonev,
                    velemenyDatuma: format(addDays(new Date(), 1), 'yyyy-MM-dd')
                }
            );
            setReviews(reviews.id);
            alert("Értékelés hozzáadva!")
            window.location.reload();
        }
    };

    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

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
        try {
            if (isFavorited) {
                toast.info("A film már hozzá van adva a kedvencekhez.");
            } else {
                const { data: favourites } = await axios.post(
                    "http://localhost:8080/favourites",
                    {
                        film_id: movieID,
                        felh_id: user.felh_id,
                        film_neve: movie[0].film_neve,
                        film_kep: movie[0].film_kep
                    }
                );
                setFavourites(favourites.kedvenc_id);
                setIsFavorited(true);
                toast.success("Sikeresen hozzáadtad a kedvencekhez!");
            }
        } catch (error) {
            toast.error("Hiba történt a kedvencek hozzáadása során");
        }
    };

    const deleteFilm = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/movies/${movieID}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        axios.delete(`http://localhost:8080/allReviews/${reviewID}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        alert("Film törölve!");
        navigate("/");
    };

    const deleteReview = async (e, id) => {
        e.preventDefault();
        const reviewToDelete = reviewByProduct.find(review => review.velemeny_id === id);
    
        if (reviewToDelete) {
            await axios.delete(`http://localhost:8080/reviews/${reviewToDelete.velemeny_id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            alert("Értékelés törölve!");
            window.location.reload();
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

    const velemenyCardStyle2 = {
        color: "white",
    };

    const filmCardStyle = {
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

    const narancs = {
        color: 'orange',
      };

    return (
        <div className="" style={pageStyle}>
            {movie.map((m) => (
                <div className="" key={m.film_id} style={filmCardStyle}>
                    <h1>{m.film_neve}</h1>
                    {isAdmin && (
                        <Button
                            onClick={(e) => deleteFilm(e, m.film_id)}
                            className="deleteBtn"
                            >
                            Törlés
                        </Button>
                    )}
                    
                    

            {!isAdmin && isLoggedIn && (
                <div>
                    <Button onClick={addFavourites} style={{ backgroundColor: '#FF0000', color: '#ffffff' }}>
                        Kedvencekhez adás
                    </Button>
                    <ToastContainer />
                </div>
            )} 
                </div>
            ))}
            <br></br><br></br><br></br>
    <div className="" >
                
    </div>
        <div className="" style={velemenyCardStyle}>
        <Container>
                {isLoggedIn && !isAdmin && (
                    <Form onSubmit={addReview}>
                        <h1>vélemény írása:</h1>
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
                                as="textarea"
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
    {reviewByProduct.length > 0 ? (
        reviewByProduct.map((pR) => (
        <div key={pR.velemeny_id} style={velemenyCardStyle}>
            <h1 style={narancs}>{pR.felhasznaloNeve}</h1>
            {isAdmin && (
            <Button
                onClick={(e) => deleteReview(e, pR.velemeny_id)}
                className="deleteBtn"
            >
                Törlés
            </Button>
            )}
            <h2>Értékelés: 5/{pR.velemenyErtekeles}</h2>
            <p>{pR.velemenyLeirasa}</p>
            <p>{pR.velemenyDatuma.split("T")[0]}</p>
        </div>
        ))
    ) : (
        <p>Nincs értékelés az adott filmre.</p>
    )}
    </div>

        </div>
        
    )
}