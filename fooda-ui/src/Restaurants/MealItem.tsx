import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import { Meal } from "./service";

type MealItemProps = {
  meal: Meal;
  isOwner?: boolean;
  addToOrder: () => void;
};

export default function MealItem({ meal, isOwner, addToOrder }: MealItemProps) {
  return (
    <Card style={{ width: "235px" }}>
      <Card.Img
        variant="top"
        src={`https://picsum.photos/seed/100${meal.id}/250/150`}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>{meal.name}</div>
          <div className="pl-2 text-primary">${meal.price}</div>
        </Card.Title>
        <Card.Text>{meal.description}&nbsp;</Card.Text>
        {isOwner ? (
          <Link to={`/meals/${meal.id}`} className="btn btn-primary">
            Edit
          </Link>
        ) : (
          <Button variant="primary" onClick={() => addToOrder()}>
            Add To Order
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
