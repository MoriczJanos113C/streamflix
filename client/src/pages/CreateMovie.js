import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM_OBJECT = {
    film_neve: "",
    film_hossz: "",
    film_kategoria: ""
};


export function CreateMovie() {
     //hooks and contextes, navigate
     const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
     const { user } = useContext(UserContext);
     const navigate = useNavigate();
     const [nameError, setNameError] = useState("");
     const [lengthError, setlengthtError] = useState("");
     const [categoryError, setCategoryError] = useState("");
 
     //validation for the form
     const checkValid = () => {
         if (
             !String(form.film_neve).match(
                 /^[a-zA-Z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!\n]/
             ) &&
             form.film_neve.trim() != ""
         )
             setNameError("Nem megfelelő film név");
         else {
             setNameError("");
         }

         if (!String(form.film_hossz).match(/^[0-9]{1,}$/) && form.film_hossz.trim() != "")
            setlengthtError("Nem megfelelő hossz");
        else {
            setlengthtError("");
        }

         if (
            !String(form.film_kategoria).match(/^[a-zA-z\u00C0-\u024F0-9 -]{4,}$/) &&
            form.film_kategoria.trim() != ""
        )
            setCategoryError("Nem megfelelő film kategória");
        else {
            setCategoryError("");
        }

     };
 
     //check that the validation is correct
     useEffect(() => {
         checkValid();
     }, [form]);
 
     //will post the datas from the form after the form sent
     //multipart form data because, its sending a file too
     //its creating a product
     const createMovie = async (e) => {
         e.preventDefault();
         if (
             nameError === "" &&
             lengthError === "" &&
             categoryError === "" &&
             form.film_neve.trim() != "" &&
             form.film_hossz.trim() != "" &&
             form.film_kategoria.trim() != ""
         ) {
             const formData = new FormData();
             formData.append("film_neve", form.film_neve);
             formData.append("film_hossz", form.film_hossz);
             formData.append("film_kategoria", form.film_kategoria);
             formData.append("file", form.file);
             await Axios.post("http://localhost:8080/movies", formData, {
                 headers: {
                     "content-type": "multipart/form-data",
                     Authorization: `Bearer ${user.token}`,
                 },
             });
             setForm(DEFAULT_FORM_OBJECT);
             navigate("/");
         }
     };
 
     //to write to form
     const updateFormValue = (key) => (e) => {
         setForm({
             ...form,
             [key]: e.target.value,
         });
     };
     //to the file
     const updateFormFileValue = (key) => (e) => {
         setForm({
             ...form,
             [key]: e.target.files[0],
         });
     };
 
     return (
         <div className="product">
             <Row>
                 <Col></Col>
                 <Col xs={6}>
                     <h1 className="headLine">Új film hozzáadása</h1>
                     <Form onSubmit={createMovie}>
                         <Form.Group className="mb-3">
                             <Form.Label>Név</Form.Label>
                             <Form.Control
                                 className="input"
                                 onChange={updateFormValue("film_neve")}
                                 value={form.film_neve}
                                 type="name"
                                 placeholder="ide írd a film nevét"
                             />
                         </Form.Group>
                         {nameError && <p>{nameError}</p>}
                         <Form.Group className="mb-3">
                             <Form.Label>FIlm hossza</Form.Label>
                             <Form.Control
                                 className="input"
                                 onChange={updateFormValue("film_hossz")}
                                 value={form.film_hossz}
                                 type="number"
                                 placeholder="ide írd a film hosszát"
                             />
                         </Form.Group>
                         {lengthError && <p>{lengthError}</p>}


                         <Form.Group className="mb-3">
                             <Form.Label>Film kategória</Form.Label>
                             <Form.Control
                                 className="input"
                                 onChange={updateFormValue("film_kategoria")}
                                 value={form.film_kategoria}
                                 type="text"
                                 placeholder="Ide írd a film kategóriáját"
                             />
                         </Form.Group>
                         {categoryError && <p>{categoryError}</p>}
                         
                         
                         <Form.Group className="mb-3">
                             <Form.Label>Kép</Form.Label>
                             <Form.Control
                                 className="input"
                                 onChange={updateFormFileValue("file")}
                                 type="file"
                             />
                         </Form.Group>
                         <Button className="btn" type="submit">
                             Új film felvétele
                         </Button>
                     </Form>
                 </Col>
                 <Col></Col>
             </Row>
         </div>
     );
 }