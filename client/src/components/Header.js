import React, { useContext } from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export function Header() {

    const isLoggedIn = useIsLoggedIn(); //from hooks folder

    return (
        <Navbar className="navbar" expand="lg">
            <Container>
                <Navbar.Brand>
                    
                        <Link className="home" to="/">
                            Kezdőlap
                        </Link>
                
                </Navbar.Brand>

            

             
                {!isLoggedIn && (
                    <Link className="link" to="/login">
                        Bejelentkezés
                    </Link>
                )}
                {!isLoggedIn && (
                    <Link className="link" to="/register">
                        Regisztráció
                    </Link>
                )}
                
                

                
                {isLoggedIn && (
                    <Link className="logOut" to="/logout">
                        Kijelentkezés
                    </Link>
                )}
            </Container>
        </Navbar>
    );
}