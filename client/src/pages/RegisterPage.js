import { useState, useContext, useEffect } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../components/kinezet.css";


const DEFAULT_FORM_OBJECT = {
    felhasznalonev: "",
    jelszo: "",
    email: "",
};

export function RegisterPage() {
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [usernameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    const checkValid = () => {
        if (
            !String(form.jelszo).match(/^[a-zA-Z0-9]{6,}$/) &&
            form.jelszo.trim() != ""
        )
            setPasswordError("Nem megfelelő jelszó");
        else {
            setPasswordError("");
        }

        if (
            !String(form.felhasznalonev).match(/^[a-zA-Z0-9]{3,}$/) &&
            form.felhasznalonev.trim() != ""
        )
            setNameError("Nem megfelelő felhasználónév");
        else {
            setNameError("");
        }

        if (
            !String(form.email).match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) &&
            form.email.trim() != ""
        )
            setEmailError("Nem megfelelő email");
        else {
            setEmailError("");
        }
    };

    useEffect(() => {
        checkValid();
    }, [form]);

    const registerUser = async (e) => {
        e.preventDefault();
        if (
            usernameError === "" &&
            passwordError === "" &&
            emailError === "" &&
            form.email.trim() != "" &&
            form.felhasznalonev.trim() != "" &&
            form.jelszo.trim() != ""
        ) {
            const rResponse = await Axios.post(
                "http://localhost:8080/register",
                form
            );
            const response = await Axios.post(
                "http://localhost:8080/login",
                form
            );
            const { token, user } = response.data;
            setUser({
                token,
                user,
            });
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                navigate("/");
            }
            if (rResponse.data.message) {
                setLoginStatus(rResponse.data.message);
            } else {
                navigate("/");
            }
        }else {
            alert("Minden mezőt tölts ki!");
          }
    };

    return (
        <div className="background">
            <Container className="doboz">
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <h1 className="betu">Regisztráció</h1>
                        <Form onSubmit={registerUser}>
                            <Form.Group>
                                <Form.Label className="igazitas1" >Felhasználónév</Form.Label>
                                <Form.Control
                                    className="in2"
                                    onChange={updateFormValue("felhasznalonev")}
                                    value={form.felhasznalonev}
                                    type="text"
                                    placeholder="Felhasználónév megadása"
                                />
                            </Form.Group>

                            {usernameError && <p>{usernameError}</p>}
                            <Form.Group>
                                <Form.Label className="igazitas2" >Email</Form.Label>
                                <Form.Control
                                    className="in2"
                                    onChange={updateFormValue("email")}
                                    value={form.email}
                                    type="email"
                                    placeholder="E-mail megadása"
                                />
                            </Form.Group>

                            {emailError && <p>{emailError}</p>}
                            <Form.Group>
                                <Form.Label className="igazitas3" >Jelszó</Form.Label>
                                <Form.Control
                                    className="in2"
                                    onChange={updateFormValue("jelszo")}
                                    value={form.jelszo}
                                    type="password"
                                    placeholder="Jelszó megadása"
                                />
                            </Form.Group>

                            {passwordError && <p>{passwordError}</p>}
                            <Button className="button1" type="submit">
                                Regisztráció
                            </Button>
                            {loginStatus && <p>{loginStatus}</p>}
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div >
        
    );
}