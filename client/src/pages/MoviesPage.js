import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function MoviesPage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
                const response = await axios.get("http://localhost:8080/movies");
                setMovies(response.data);
        };
        fetchMovies();
    }, []);

    return (
        <div className="">
            {movies.map((m) => (
                
                <div className="" key={m.film_id}>
                    <h1>{m.film_neve}</h1>
                    <Link to={`/movies/${m.film_id}`}>
                            Leírás
                    </Link>
                </div>
                
            ))}
        </div>
    );
}