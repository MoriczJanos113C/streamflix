import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";

const DEFAULT_FORM_OBJECT = {
    velemenyErtekelese: "",
    velemenyLeirasa: "",
};

export function MoviePage() {

    const [movie, setMovie] = useState([]);
    const { id: movieID } = useParams();

    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);

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
                `http://localhost:8080/productReviews/${reviewID}`
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
            form.rating.trim() != "" &&
            form.description.trim() != ""
        ) {
            const { data: reviews } = await axios.post(
                "http://localhost:8080/review",
                {
                    product_id: productID,
                    user_id: user.id,
                    username: user.username,
                    description: form.description,
                    rating: form.rating,
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
            !String(form.rating).match(/^[1-5]{1,1}$/) &&
            form.rating.trim() != ""
        )
            setRatingError("Nem megfelelő értékelés");
        else {
            setRatingError("");
        }

        if (
            !String(form.description).match(
                /^[a-zA-Z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!]{5,}$/
            ) &&
            form.description.trim() != ""
        )
            setDescriptionError("Nem megfelelő vélemény");
        else {
            setDescriptionError("");
        }
    };

    //check that the validation is correct
    useEffect(() => {
        checkValid();
    }, [form]);

    return (
        <div className="">
            {movie.map((m) => (
                <div className="" key={m.film_id}>
                    <h1>{m.film_neve}</h1>
                    
                </div>
            ))}

<Container>
                {isLoggedIn && (
                    <Form onSubmit={addReview}>
                        <Form.Group className="mb-3">
                            <Form.Label>Értékelés</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("rating")}
                                value={form.rating}
                                placeholder="Értékelés pontszám szerint"
                            />
                        </Form.Group>
                        {ratingError && <p>{ratingError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Termék vélemény írás</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("description")}
                                value={form.description}
                                placeholder="Leírás"
                            />
                        </Form.Group>
                        {descriptionError && <p>{descriptionError}</p>}
                        <Button className="reviewBtn" type="submit">
                            Vélemény elküldése
                        </Button>
                    </Form>
                )}
            </Container>
        </div>
        
    )
}