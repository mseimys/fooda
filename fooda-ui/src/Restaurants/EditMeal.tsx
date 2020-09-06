import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";

import restaurantService, { Meal } from "./service";

type EditMealProps = {
  isNew?: boolean;
};

export default function EditMeal({ isNew }: EditMealProps) {
  const history = useHistory();
  const location = useLocation<{ restaurantId: number }>();
  const { mealId } = useParams();
  const [error, setError] = useState("");

  const [initialValues, setInitialValues] = useState<Meal>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    restaurant: location.state?.restaurantId,
  });
  const [loading, setLoading] = useState(true);

  const formik = useFormik<Meal>({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      try {
        const meal = isNew
          ? await restaurantService.createMeal(values)
          : await restaurantService.updateMeal(mealId, values);
        history.push(`/restaurants/${meal.restaurant}`);
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
      : restaurantService.getMeal(mealId).then((meal) => {
          setInitialValues(meal);
          setLoading(false);
        });
  }, [mealId, isNew]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Form
      onSubmit={formik.handleSubmit as any}
      style={{ margin: "0 auto", maxWidth: "320px" }}
    >
      <h1 className="text-center mb-4">
        {isNew ? "Create a meal" : "Edit meal"}
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
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formik.values.price}
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
