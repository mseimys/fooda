import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import logo from "../logo.png";
import { RootContext } from "../context";
import userService from "./service";

export default function Login() {
  const history = useHistory();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, clearUser } = useContext(RootContext);

  useEffect(clearUser, []);

  const handleSubmit = async (event: any) => {
    setError("");
    event.preventDefault();
    event.stopPropagation();
    try {
      const tokens = await userService.login({ username, password });
      const user = await userService.me(tokens.access);
      setUser({
        ...user,
        token: tokens.access,
        anonymous: false,
      });
      history.push("/");
    } catch (err) {
      let message = String(err);
      if (err.response && err.response.data) {
        message = err.response.data.detail;
      }
      setError(message);
    }
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
      {error && <div className="text-danger mb-3">{error}</div>}
      <Button block type="submit" disabled={!isValid()}>
        Login
      </Button>
    </Form>
  );
}
