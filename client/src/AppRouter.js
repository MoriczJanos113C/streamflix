import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage";
import { MoviePage } from "./pages/MoviePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export const AppRouter = () => {
    return (
        <Router>

            <Routes>
            <Route path="/" element={<MoviesPage />} />
            
      
            <Route path="/movies/:id" element={<MoviePage />} />

            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
};