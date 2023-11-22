import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

export function Favourites() {
    const [favourites, setFavourites] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchFavourites = async () => {
            const { data: favourites } = await axios.get(
                `http://localhost:8080/kedvencek/${user.felh_id}`
            );
            console.log(favourites);
            setFavourites(favourites);
        };
        fetchFavourites();
    }, [user.felh_id]);

    return (
        <div>
        <h1>Kedvencei:</h1>
        <div className="">
            {favourites.length > 0 ? (
                favourites.map((f) => (
                    <div key={f.kedvenc_id}>
                        <h1>{f.film_neve}</h1>
                    </div>
                ))
            ) : (
                <p>Nincsenek kedvencei.</p>
            )}
        </div>
    </div>
    );
}