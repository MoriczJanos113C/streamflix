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

    const movieCardStyle = {
        background: "darkgrey",
        color: "yellow",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        width: "200px", // Állítsd be a kívánt kártya szélességét
        display: "inline-block", // A kártyák egymás mellett helyezkednek el
    };

    const containerStyle = {
        background: "black", 
        padding: "20px",
        minHeight: "100vh", // Teljes képernyő magasság
    };

    return (
        <div style={containerStyle}>
            {movies.map((m) => (
                <div style={movieCardStyle} key={m.film_id}>
                    <h1>{m.film_neve}</h1>
                    <Link to={`/movies/${m.film_id}`}>
                        Leírás
                    </Link>
                </div>
                
            ))}
        </div>
    );
}
