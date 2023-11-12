import { useState, useContext } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


const DEFAULT_FORM_OBJECT = {
    felhasznalonev: "",
    jelszo: "",
};

export function LoginPage() {
    //hooks and contextes
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");

    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    //will post the datas from the form after the form is sent
    //its logging in the user if the user having correct datas for his/her account(username, password)
    //and if he/she not having the correct datas will send a message that the user is having bad datas like "Bad password or username"
    const loginUser = async (e) => {
        e.preventDefault();
        const response = await Axios.post("http://localhost:8080/login", form);
        const { token, user } = response.data;
        setUser({
            token,
            user,
        });
        if (response.data.message) {
            setLoginStatus(response.data.message);
        } else {
            setLoginStatus(response.data[0]);
            navigate("/");
        }
    };

    //its navigating the user to the frontpage with a button without logging in
    const navigateToMovies = () => {
        navigate("/");
    };

    const loginCardStyle = {
        background: "orange",
        color: "white",
        width: "300px",
        display: "inline-block",
        border: "3px solid white",
        padding: "40px",
        margin: "50px",
        borderRadius: "10px",
    };

    const pageStyle = {
        background: "black", 
        minHeight: "100vh",
    };

    return (
        
        <div className="logIn" style={pageStyle}>
            <Row style={loginCardStyle}>
                <Col></Col>
                <Col xs={6}>
                    <h1 className="headLine">Bejelentkezés</h1>
                    <Form onSubmit={loginUser}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="felhasznalonev">
                                Felhasználónév
                            </Form.Label>
                            <Form.Control
                                className="input"
                                id="felhasznalonev"
                                onChange={updateFormValue("felhasznalonev")}
                                value={form.felhasznalonev}
                                type="text"
                                placeholder="Felhasználónév"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="jelszo">Jelszó</Form.Label>
                            <Form.Control
                                className="input"
                                id="jelszo"
                                onChange={updateFormValue("jelszo")}
                                value={form.jelszo}
                                type="password"
                                placeholder="Jelszó"
                            />
                        </Form.Group>
                        <Button
                            className="btn"
                            data-testid="login"
                            type="submit"
                            style={{ backgroundColor: '#4caf50', color: '#ffffff' }}
                        >
                            Bejelentkezés
                        </Button>
                        {loginStatus && <p>{loginStatus}</p>}
                        <Button
                            onClick={navigateToMovies}
                            className="btn"
                            type="submit"
                            style={{ backgroundColor: '#808080', color: '#ffffff' }}
                        >
                            Folytatás bejelentkezés nélkül
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default LoginPage;