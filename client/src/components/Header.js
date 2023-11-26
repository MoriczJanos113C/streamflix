import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { useIsAdmin } from "../hooks/useIsAdmin";
import "./Header.css";

export function Header() {
    const isLoggedIn = useIsLoggedIn();
    const isAdmin = useIsAdmin();

    return (
        <Navbar className="navbar">
        <div className="hidden">
</div>
            <Container >
            <img src="images/img1.png" alt="" className="image1" />

                <Navbar.Brand>
                    <Link className="home" to="/">
                        Kezdőlap
                    </Link>
                </Navbar.Brand>

                {!isLoggedIn && (
                    <>
                        <Link className="link" to="/login">
                            Bejelentkezés
                        </Link>
                        <Link className="link" to="/register">
                            Regisztráció
                        </Link>
                    </>
                )}
                {isLoggedIn && !isAdmin && (
                    <Link className="favourites" to="/favourites">
                        Kedvencek
                    </Link>
                )}
                {isLoggedIn && isAdmin && (
                    <Link className="logOut" to="/createMovie">
                        Film létrehozása
                    </Link>
                )}
                {isLoggedIn && (
                    <Link className="logOut" to="/logout">
                        Kijelentkezés
                    </Link>
                )}

                
                  
<img src="images/img1.png" alt="" className="image2" />  
            </Container>
        </Navbar>
    );
}