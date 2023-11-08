import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function MoviePage() {

    const [movie, setMovie] = useState([]);
    const { id: movieID } = useParams();
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

    return (
        <div className="">
            {movie.map((m) => (
                <div className="" key={m.film_id}>
                    <h1>{m.film_neve}</h1>
                    
                </div>
            ))}
        </div>
    )
}