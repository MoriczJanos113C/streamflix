import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Ez az oldal nem létezik!</p>
        <Link to={"/"}>
            Visszatérés a főoldalra
        </Link>
    </div>
  );
};