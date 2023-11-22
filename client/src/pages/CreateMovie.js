import { useContext, useState } from "react";
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
     const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
     const { user } = useContext(UserContext);
     const navigate = useNavigate();

     const createMovie = async (e) => {
        e.preventDefault();
        if (
          form.film_neve.trim() !== "" &&
          form.film_hossz.trim() !== "" &&
          form.film_kategoria.trim() !== ""
        ) {
          const formData = new FormData();
          formData.append("film_neve", form.film_neve);
          formData.append("film_hossz", form.film_hossz);
          formData.append("film_kategoria", form.film_kategoria);

          if (form.file) {
            formData.append("file", form.file);
          } else {
            alert("A film képét kötelező feltölteni!");
            return;
          }
      
          try {
            await Axios.post("http://localhost:8080/movies", formData, {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${user.token}`,
              },
            });
            setForm(DEFAULT_FORM_OBJECT);
            navigate("/");
          } catch (error) {
            alert("Hiba történt a film létrehozása közben.");
          }
        } else {
          alert("Minden mezőt tölts ki!");
        }
      };

     const updateFormValue = (key) => (e) => {
         setForm({
             ...form,
             [key]: e.target.value,
         });
     };

     const updateFormFileValue = (key) => (e) => {
         setForm({
             ...form,
             [key]: e.target.files[0],
         });
     };
 
     return (
         <div className="">
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

                         <Form.Group className="mb-3">
                             <Form.Label>Film hossza</Form.Label>
                             <Form.Control
                                 className="input"
                                 onChange={updateFormValue("film_hossz")}
                                 value={form.film_hossz}
                                 type="number"
                                 placeholder="ide írd a film hosszát"
                             />
                         </Form.Group>

                         <Form.Group className="mb-3">
                            <Form.Label>Film kategória</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={updateFormValue("film_kategoria")}
                                value={form.film_kategoria}>
                                <option value="">Válassz kategóriát</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="horror">Horror</option>
                                <option value="vígjáték">Vígjáték</option>
                                <option value="romantikus">Romantikus</option>
                            </Form.Control>
                        </Form.Group>
                         
                         
                         
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