import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import logo from "../logo.png";
import { RootContext, UserType } from "../context";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, clearUser } = useContext(RootContext);

  useEffect(() => {
    clearUser();
  }, [clearUser]);

  const handleSubmit = () => {
    setUser({
      isAnonymous: false,
      type: UserType.REGULAR,
      name: username,
      token: "token",
    });
    history.push("/");
  };

  function isValid() {
    return username.length > 0 && password.length > 0;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ margin: "0 auto", maxWidth: "320px" }}
    >
      <div className="text-center">
        <img src={logo} alt="Logo" />
      </div>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </Form.Group>
      <Button block type="submit" disabled={!isValid()}>
        Login
      </Button>
    </Form>
  );
}
