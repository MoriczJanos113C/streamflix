import { useContext } from "react";
import { UserContext } from "../App";

//role decideing if user having admin role
export const useIsAdmin = () => {
    const { user } = useContext(UserContext);
    return user?.role === "admin";
};