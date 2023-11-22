import { useState, useContext } from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../components/kinezet.css";


const DEFAULT_FORM_OBJECT = {
    felhasznalonev: "",
    jelszo: "",
};

export function LoginPage() {
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");

    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

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

    const navigateToMovies = () => {
        navigate("/");
    };

    return (
        
        <div className="background">
            <Row className="doboz">
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
                        <Button className="button1"
                            data-testid="login"
                            type="submit"
                            
                        >
                            Bejelentkezés
                        </Button>
                        {loginStatus && <p>{loginStatus}</p>}
                        <Button className="button3"
                            onClick={navigateToMovies}
                            type="submit"
                            
                            
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