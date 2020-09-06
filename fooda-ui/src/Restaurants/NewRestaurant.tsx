import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";

import { RootContext } from "../context";
import restaurantService, { Restaurant } from "./service";

export default function NewRestaurant() {
  const history = useHistory();
  const [error, setError] = useState("");

  const { user } = useContext(RootContext);

  const formik = useFormik<Restaurant>({
    initialValues: {
      id: 0,
      name: "",
      description: "",
      owner: user.id,
      meals: [],
    },

    onSubmit: async (values) => {
      setError("");
      try {
        const restaurant = await restaurantService.createRestaurant(values);
        history.push(`/restaurants/${restaurant.id}`);
      } catch (err) {
        let message = "Error creating restaurant!";
        if (err.data) {
          message = JSON.stringify(err.data);
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
      <h1 className="text-center mb-4">Create a new restaurant</h1>
      <Form.Group controlId="username">
        <Form.Label>Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </Form.Group>
      {error && <div className="text-danger mb-3">{error}</div>}
      <Button block type="submit">
        Create
      </Button>
    </Form>
  );
}
