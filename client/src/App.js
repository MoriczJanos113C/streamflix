import './App.css';
import { AppRouter } from "./AppRouter";
import React, { useEffect, useState } from "react";
export const ConfirmationContext = React.createContext();
export const UserContext = React.createContext();



function App() {
  const confirmationState = useState(null);

//localstorage for the user
const userState = useState(() => {
  const userInLocalStorage = localStorage.getItem("user");
  return userInLocalStorage ? JSON.parse(userInLocalStorage) : {};
});

//will save the user's datas to localstorage
useEffect(() => {
  localStorage.setItem("user", JSON.stringify(userState[0]));
}, userState);

  return (
    <div className="App">
      <UserContext.Provider
                value={{
                    token: userState[0].token,
                    user: userState[0].user,
                    setUser: userState[1],
                }}
            >

            
            <ConfirmationContext.Provider value={confirmationState}>
                  <AppRouter />
            </ConfirmationContext.Provider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
