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
        background: "#808080",
        color: "white",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        width: "200px",
        display: "inline-block",
    };

    const pageStyle = {
        background: "black", 
        padding: "40px",
        minHeight: "100vh",
    };

    return (
        <div style={pageStyle}>
            {movies.map((m) => (
                <div style={movieCardStyle} key={m.film_id}>
                    <h1>{m.film_neve}</h1>
                    <img src={`http://localhost:8080/${m.film_kep}`} alt="Film" />
                    
                    <Link to={`/movies/${m.film_id}`}>
                        Leírás
                    </Link>
                </div> 
            ))}
        </div>
    );
}