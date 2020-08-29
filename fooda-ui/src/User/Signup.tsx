import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { RootContext, UserType } from "../context";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<UserType>(UserType.REGULAR);
  const [password, setPassword] = useState("");

  const { clearUser } = useContext(RootContext);

  const handleSubmit = () => {
    console.log("SIGNUP", username, email, password, type);
    history.push("/");
  };

  useEffect(() => {
    clearUser();
  }, [clearUser]);

  function isValid() {
    return username.length > 0 && email.length > 0 && password.length > 0;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ margin: "0 auto", maxWidth: "320px" }}
    >
      <h1 className="text-center mb-4">Create account</h1>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Account Type</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value={UserType.REGULAR}>Regular user</option>
          <option value={UserType.OWNER}>Restaurant owner</option>
        </Form.Control>
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
        Signup
      </Button>
    </Form>
  );
}
