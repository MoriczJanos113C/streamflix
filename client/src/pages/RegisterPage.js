import { useState, useContext, useEffect } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


const DEFAULT_FORM_OBJECT = {
    felhasznalonev: "",
    jelszo: "",
    email: "",
};

export function RegisterPage() {
    //hooks, contextes and navigate
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [usernameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    //validation to the form
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

    //check that the validation is correct
    useEffect(() => {
        checkValid();
    }, [form]);

    //will register a user if the form's is valid and if the user is forgetting he already having an account, he will logged in with his/her account what he/she already had before
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
        }
    };

    return (
        <div className="register">
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <h1 className="headLine">Regisztráció</h1>
                        <Form onSubmit={registerUser}>
                            <Form.Group className="mb-3">
                                <Form.Label>Felhasználónév</Form.Label>
                                <Form.Control
                                    className="input"
                                    onChange={updateFormValue("felhasznalonev")}
                                    value={form.felhasznalonev}
                                    type="text"
                                    placeholder="A kívánt felhasználónév megadása"
                                />
                            </Form.Group>

                            {usernameError && <p>{usernameError}</p>}
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="input"
                                    onChange={updateFormValue("email")}
                                    value={form.email}
                                    type="text"
                                    placeholder="A kívánt email megadása"
                                />
                            </Form.Group>

                            {emailError && <p>{emailError}</p>}
                            <Form.Group className="mb-3">
                                <Form.Label>Jelszó</Form.Label>
                                <Form.Control
                                    className="input"
                                    onChange={updateFormValue("jelszo")}
                                    value={form.jelszo}
                                    type="password"
                                    placeholder="A kívánt jelszó megadása"
                                />
                            </Form.Group>

                            {passwordError && <p>{passwordError}</p>}
                            <Button className="btn" type="submit">
                                Regisztráció
                            </Button>
                            {loginStatus && <p>{loginStatus}</p>}
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}