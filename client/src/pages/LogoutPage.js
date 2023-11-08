import { useContext, useEffect } from "react";
import React from "react";
import {  UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export function LogoutPage() {
    //contextes, navigate
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();



    //the datas what is sent to the localstorage will removed after he/she clicked the logout button and called the logOutCart method too
    useEffect(() => {
        setUser({});
        navigate("/");
    }, []);

    return <div></div>;
}