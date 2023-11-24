import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import "../components/kinezet.css";

const DEFAULT_FORM_OBJECT = {
    film_neve: "",
    film_hossz: "",
    film_kategoria: ""
};

export function EditMovie() {
     const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
     const { user } = useContext(UserContext);
     const navigate = useNavigate();
     const { id: movieID } = useParams();

     useEffect(() => {
      const getMovie = async () => {
          const { data: movies } = await Axios.get(
              `http://localhost:8080/movies/${movieID}`
          );
          console.log("movies[0].film_hossz:", movies[0].film_hossz);
          setForm({
              film_neve: movies[0].film_neve,
              film_hossz: movies[0].film_hossz,
              film_kategoria: movies[0].film_kategoria,
              file: movies[0].film_kep
          });
      };
    
      getMovie();
    }, []);

    const editMovie = async (e) => {
      e.preventDefault();
      if (
          form.film_neve.trim() != "" &&
          form.film_hossz.toString().trim() !== "" &&
          form.film_kategoria.trim() != ""
      ) {
          const formData = new FormData();
          formData.append("film_neve", form.film_neve);
          formData.append("film_hossz", form.film_hossz);
          formData.append("film_kategoria", form.film_kategoria);
          formData.append("file", form.file);

          await Axios.put(
              `http://localhost:8080/movies/${movieID}`,
              formData,
              {
                  headers: {
                      "content-type": "multipart/form-data",
                      Authorization: `Bearer ${user.token}`,
                  },
              }
          );
          setForm(DEFAULT_FORM_OBJECT);
          navigate("/");
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
         <div className="background">
             <Row className="doboz">
                 <Col></Col>
                 <Col xs={6}>
                     <h1 >Film szerkesztése</h1>
                     <Form onSubmit={editMovie}>
                         <Form.Group>
                             <Form.Label className="igazitas6" >Név</Form.Label>
                             <Form.Control
                                 className="in2"
                                 onChange={updateFormValue("film_neve")}
                                 value={form.film_neve}
                                 type="name"
                                 placeholder="ide írd a film nevét"
                             />
                         </Form.Group>

                         <Form.Group>
                             <Form.Label className="igazitas7" >Film hossza</Form.Label>
                             <Form.Control
                                 className="in2"
                                 onChange={updateFormValue("film_hossz")}
                                 value={form.film_hossz}
                                 type="number"
                                 placeholder="ide írd a film hosszát"
                             />
                         </Form.Group>

                         <Form.Group>
                            <Form.Label className="igazitas8" >Film kategória</Form.Label>
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
                         
                         
                         
                         <Form.Group>
                             <Form.Label className="igazitas9" >Kép</Form.Label>
                             <Form.Control
                                 onChange={updateFormFileValue("file")}
                                 type="file"
                             />
                         </Form.Group>
                         <Button  type="submit" className="button1">
                             Film szerkesztése
                         </Button>
                     </Form>
                 </Col>
                 <Col></Col>
             </Row>
         </div>
     );
 }