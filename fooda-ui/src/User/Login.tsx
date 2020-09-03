import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";

import logo from "../logo.png";
import { RootContext } from "../context";
import userService, { Credentials } from "./service";

export default function Login() {
  const history = useHistory();
  const [error, setError] = useState("");
  const { setUser, clearUser } = useContext(RootContext);

  useEffect(clearUser, []);

  const formik = useFormik<Credentials>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },

    onSubmit: async (values) => {
      setError("");
      try {
        const user = await userService.login(values);
        setUser(user);
        history.push("/");
      } catch (err) {
        let message = String(err);
        if (err.response && err.response.data) {
          message = err.response.data.detail;
        }
        setError(message);
      }
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit as any}
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
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </Form.Group>
      {error && <div className="text-danger mb-3">{error}</div>}
      <Button block type="submit" disabled={!(formik.isValid && formik.dirty)}>
        Login
      </Button>
    </Form>
  );
}
