import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useIsAdmin } from "../hooks/useIsAdmin";
import "../components/kinezet.css";

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
    <div className="background2">
      <div>
        <label className="betu">
          Keresés film neve alapján:
          <input
            className="in"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </label>

        <div className="betu">
          Válassz kategóriát:
          {['all', 'horror', 'romantikus', 'vígjáték', 'fantasy'].map((category) => (
            <button className="button4"
              key={category}
              style={{background: selectedCategory === category ? 'orange' : 'gray'}}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filterMovies().map((m) => (
        <div className="kartya" key={m.film_id}>
          <h1>{m.film_neve}</h1>
          <img src={`http://localhost:8080/${m.film_kep}`} alt="Film" />
          <Link className="linkszin3" to={`/movies/${m.film_id}`}>
            Leírás
          </Link>

          {isAdmin && (
            <Link to={`/editMovie/${m.film_id}`} className="linkszin4">
            Film szerkesztése
          </Link>
          )}
          
        </div>
      ))}
    </div>
  );
}