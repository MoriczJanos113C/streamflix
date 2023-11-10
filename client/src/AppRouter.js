import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage";
import { MoviePage } from "./pages/MoviePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import { Header } from "./components/Header";
import { LogoutPage } from "./pages/LogoutPage";
import { Favourites } from "./pages/Favourites";


export const AppRouter = () => {
    const isLoggedIn = useIsLoggedIn();

    return (
        <Router>
            <Header />

            <Routes>
            <Route path="/" element={<MoviesPage />} />
            
      
            <Route path="/movies/:id" element={<MoviePage />} />

            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/register" element={<RegisterPage />} />
            {isLoggedIn && (
                    <Route path="/logout" element={<LogoutPage />} />
                )}
            {isLoggedIn && (
                 <Route path="/favourites" element={<Favourites />} />
                 )}
            </Routes>
        </Router>
    );
};