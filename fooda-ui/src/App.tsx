import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Topbar from "./Topbar";
import Routes from "./Routes";
import { User, RootContext, anonymousUser } from "./context";

const currentUser = JSON.parse(
  localStorage.getItem("user") || JSON.stringify(anonymousUser)
);

export default function App() {
  const [user, setUser] = useState(currentUser);

  const defaultContext = {
    user,
    clearUser: () => setUser(anonymousUser),
    setUser: (user: User) => {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
  };

  return (
    <RootContext.Provider value={defaultContext}>
      <Router>
        <Topbar />
        <Routes />
      </Router>
    </RootContext.Provider>
  );
}
