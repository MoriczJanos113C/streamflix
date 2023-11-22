import React from "react";
import { Link } from "react-router-dom";
import "../components/kinezet.css";

export const NotFound = () => {
  return (
    <div className="background">
      <h1 className="betu">404 - Not Found</h1>
      <p className="betu">Ez az oldal nem létezik!</p>
        <Link to={"/"} className="linkszin">
            Visszatérés a főoldalra
        </Link>
    </div>
  );
};