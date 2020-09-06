import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";

import { RootContext } from "../context";
import restaurantService, { Restaurant } from "./service";

type EditRestaurantProps = {
  isNew?: boolean;
};

export default function EditRestaurant({ isNew }: EditRestaurantProps) {
  const history = useHistory();
  const { restaurantId } = useParams();
  const [error, setError] = useState("");

  const { user } = useContext(RootContext);
  const [initialValues, setInitialValues] = useState<Restaurant>({
    id: 0,
    name: "",
    description: "",
    owner: user.id,
    meals: [],
  });
  const [loading, setLoading] = useState(true);

  const formik = useFormik<Restaurant>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      try {
        isNew
          ? await restaurantService.createRestaurant(values)
          : await restaurantService.updateRestaurant(restaurantId, values);
        history.push(`/restaurants`);
      } catch (err) {
        let message = "Error!";
        if (err.data) {
          message = JSON.stringify(err.data);
        }
        setError(message);
      }
    },
  });

  useEffect(() => {
    isNew
      ? setLoading(false)
      : restaurantService.getRestaurant(restaurantId).then((restaurant) => {
          setInitialValues(restaurant);
          setLoading(false);
        });
  }, [restaurantId, isNew]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Form
      onSubmit={formik.handleSubmit as any}
      style={{ margin: "0 auto", maxWidth: "320px" }}
    >
      <h1 className="text-center mb-4">
        {isNew ? "Create a new restaurant" : "Edit"}
      </h1>
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
      <Form.Group controlId="description">
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
        {isNew ? "Create" : "Save"}
      </Button>
    </Form>
  );
}
