import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Topbar from "./Topbar";
import Routes from "./Routes";
import { User, RootContext, anonymousUser } from "./context";

let currentUser = anonymousUser;

try {
  currentUser = JSON.parse(
    localStorage.getItem("user") || JSON.stringify(anonymousUser)
  );
} catch (err) {}

export default function App() {
  const [user, setUser] = useState<User>(currentUser);

  const defaultContext = {
    user,
    clearUser: () => {
      setUser(anonymousUser);
      localStorage.removeItem("user");
    },
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
