import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "./Header.css"; // Importáltam egy külső CSS fájlt a további testreszabásokhoz

export function Header() {
    const isLoggedIn = useIsLoggedIn(); // from hooks folder

    return (
        <Navbar className="navbar navbar-dark" expand="lg" bg="dark" variant="dark">
            <Container >
<div style={{ overflow: 'hidden'}}>
<img src="images/img1.png" alt="" style={{float: 'left'}} height="30px"/>
</div>
  

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
                {isLoggedIn && (
                    <Link className="favourites" to="/favourites">
                        Kedvencek
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