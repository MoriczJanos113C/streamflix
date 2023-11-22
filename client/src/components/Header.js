import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { useIsAdmin } from "../hooks/useIsAdmin";
import "./Header.css"; // Importáltam egy külső CSS fájlt a további testreszabásokhoz

export function Header() {
    const isLoggedIn = useIsLoggedIn(); // from hooks folder
    const isAdmin = useIsAdmin();

    return (
        <Navbar className="navbar navbar-dark" expand="lg" bg="dark" variant="dark">
        <div style={{ overflow: 'hidden'}}>
<img src="images/img1.png" alt="" style={{float: 'left'}} height="30px"/>
<img src="images/img1.png" alt="" style={{float: 'right'}} height="30px"/>
</div>
            <Container >

  

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

                
                  
                
            </Container>
          
        </Navbar>
    );
}