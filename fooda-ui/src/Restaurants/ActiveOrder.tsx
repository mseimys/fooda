import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

import { Order } from "../Orders/service";
import { Meal } from "./service";

type ActiveOrderProps = {
  order: Order;
  addMeal: (meal: Meal) => void;
  removeMeal: (meal: Meal) => void;
};

type ActiveOrderItemProps = {
  meal: Meal;
  count: number;
  addToOrder: () => void;
  removeFromOrder: () => void;
};

const OrderButton = (props: any) => (
  <Button variant="secondary" size="sm" className="my-n2" {...props}>
    {props.children}
  </Button>
);

function ActiveOrderItem({
  meal,
  count,
  addToOrder,
  removeFromOrder,
}: ActiveOrderItemProps) {
  return (
    <ListGroup.Item className="d-flex">
      <div className="flex-grow-1 pr-2">{meal.name}</div>
      <div>
        <OrderButton onClick={() => removeFromOrder()}>-</OrderButton>
        <span className="px-2">{count}</span>
        <OrderButton onClick={() => addToOrder()}>+</OrderButton>
      </div>
      <div style={{ flex: "none", textAlign: "right", width: "60px" }}>
        ${meal.price}
      </div>
    </ListGroup.Item>
  );
}

export default function ActiveOrder({
  order,
  addMeal,
  removeMeal,
}: ActiveOrderProps) {
  return (
    <div>
      <hr />
      <h3>Current Order</h3>
      {order.meals.length === 0 && <p className="text-muted">No items added</p>}
      <ListGroup>
        {order.meals.map((meal, index) => (
          <ActiveOrderItem
            key={index}
            meal={meal}
            count={1}
            addToOrder={() => addMeal(meal)}
            removeFromOrder={() => removeMeal(meal)}
          />
        ))}
        {order.meals.length > 0 && (
          <Button className="mt-2">Place Order</Button>
        )}
      </ListGroup>
    </div>
  );
}
