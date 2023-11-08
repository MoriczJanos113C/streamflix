import { useContext } from "react";
import { UserContext } from "../App";

//will decide if the user is logged in
export const useIsLoggedIn = () => {
    const { token } = useContext(UserContext);
    return !!token;
};