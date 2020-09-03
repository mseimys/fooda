import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";

import { RootContext, UserType } from "../context";
import userService, { UserSignup } from "./service";

export default function Signup() {
  const history = useHistory();
  const [error, setError] = useState("");

  const { clearUser } = useContext(RootContext);

  useEffect(() => {
    clearUser();
  }, [clearUser]);

  const formik = useFormik<UserSignup>({
    initialValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      user_type: UserType.REGULAR,
    },

    onSubmit: async (values) => {
      setError("");
      try {
        await userService.signup(values);
        history.push("/");
      } catch (err) {
        setError(String(err));
      }
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit as any}
      style={{ margin: "0 auto", maxWidth: "320px" }}
    >
      <h1 className="text-center mb-4">Create account</h1>
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
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Account Type</Form.Label>
        <Form.Control
          as="select"
          name="user_type"
          value={formik.values.user_type}
          onChange={formik.handleChange}
        >
          <option value={UserType.REGULAR}>Regular user</option>
          <option value={UserType.OWNER}>Restaurant owner</option>
        </Form.Control>
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
      <Button block type="submit">
        Signup
      </Button>
    </Form>
  );
}
