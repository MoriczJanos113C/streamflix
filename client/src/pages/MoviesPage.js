import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useIsAdmin } from "../hooks/useIsAdmin";

export function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const isAdmin = useIsAdmin();

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  const filterMovies = () => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const lowercaseSelectedCategory = selectedCategory;
  
    return movies.filter((movie) => {
      const lowercaseCategory = movie.film_kategoria
        ? movie.film_kategoria.toLowerCase()
        : "";
      const categoryMatch =
        lowercaseSelectedCategory === "all" ||
        lowercaseCategory.includes(lowercaseSelectedCategory);
      const titleMatch = movie.film_neve.toLowerCase().includes(lowercaseSearchTerm);
      return categoryMatch && titleMatch;
    });
  };


  return (
    <div style={pageStyle}>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Keresés film neve alapján:
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </label>

        <div>
          Válassz kategóriát:
          {['all', 'horror', 'romantikus', 'vígjáték', 'fantasy'].map((category) => (
            <button
              key={category}
              style={{ margin: '5px', padding: '5px', background: selectedCategory === category ? 'blue' : 'gray', color: 'white' }}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filterMovies().map((m) => (
        <div style={movieCardStyle} key={m.film_id}>
          <h1>{m.film_neve}</h1>
          <img src={`http://localhost:8080/${m.film_kep}`} alt="Film" />

          <Link to={`/movies/${m.film_id}`}>
            Leírás
          </Link>

          {isAdmin && (
            <Link to={`/editMovie/${m.film_id}`}>
            Film szerkesztése
          </Link>
          )}
          
        </div>
      ))}
    </div>
  );
}