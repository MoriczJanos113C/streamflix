import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";
import "../components/kinezet.css";

export function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchFavourites = async () => {
            const { data: favourites } = await axios.get(
                `http://localhost:8080/favourites/${user.felh_id}`
            );
            setFavourites(favourites);
        };
        fetchFavourites();
    }, [user.felh_id]);

    const deleteFavourite = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/favourites/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        alert("Eltávolítva a kedvencekből az adott film!")
        window.location.reload();
    };

    return (
        <div className="background">
        <h1 className="betu">Kedvencei:</h1>
        <div className="">
            {favourites.length > 0 ? (
                favourites.map((f) => (
                    <div className="kartya" key={f.kedvenc_id}>
                        <h1>{f.film_neve}</h1>
                        <Button 
                            onClick={(e) => deleteFavourite(e, f.kedvenc_id)}
                            className="button2"
                            >
                            Törlés
                        </Button>
                    </div>
                ))
            ) : (
                <p className="betu">Nincsenek kedvencei.</p>
            )}
        </div>
    </div>
    );
}