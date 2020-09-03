import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Topbar from "./Topbar";
import Routes from "./Routes";
import { User, RootContext, anonymousUser } from "./context";
import userService from "./User/service";

const currentUser = userService.getCurrentUser();

export default function App() {
  const [user, setUser] = useState<User>(currentUser);

  const defaultContext = {
    user,
    clearUser: () => {
      setUser(anonymousUser);
      userService.logout();
    },
    setUser: (newUser: User) => {
      setUser(newUser);
      userService.saveUser(newUser);
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
