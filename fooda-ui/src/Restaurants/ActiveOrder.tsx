import React from "react";
import { useHistory } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";

import orderService, {
  Order,
  OrderItem,
  calculateTotal,
} from "../Orders/service";
import { Meal } from "./service";

type ActiveOrderProps = {
  order: Order;
  addMeal: (meal: Meal) => void;
  removeMeal: (meal: Meal) => void;
};

type ActiveOrderItemProps = {
  item: OrderItem;
  addToOrder: () => void;
  removeFromOrder: () => void;
};

const OrderButton = (props: any) => (
  <Button variant="secondary" size="sm" className="my-n2" {...props}>
    {props.children}
  </Button>
);

function ActiveOrderItem({
  item,
  addToOrder,
  removeFromOrder,
}: ActiveOrderItemProps) {
  return (
    <ListGroup.Item className="d-flex">
      <div className="flex-grow-1 pr-2">{item.meal.name}</div>
      <div>
        <OrderButton onClick={() => removeFromOrder()}>-</OrderButton>
        <span
          className="text-center"
          style={{ width: "30px", display: "inline-block" }}
        >
          {item.count}
        </span>
        <OrderButton onClick={() => addToOrder()}>+</OrderButton>
      </div>
      <div style={{ flex: "none", textAlign: "right", width: "60px" }}>
        ${item.meal.price}
      </div>
    </ListGroup.Item>
  );
}

export default function ActiveOrder({
  order,
  addMeal,
  removeMeal,
}: ActiveOrderProps) {
  const history = useHistory();

  const placeOrder = async () => {
    await orderService.createOrder(order);
    history.push("/orders");
  };

  return (
    <div>
      <hr />
      <h3>Current Order</h3>
      <ListGroup>
        {order.items.map((item, index) => (
          <ActiveOrderItem
            key={index}
            item={item}
            addToOrder={() => addMeal(item.meal)}
            removeFromOrder={() => removeMeal(item.meal)}
          />
        ))}
        {order.items.length > 0 ? (
          <>
            <h5 className="text-right mt-3 px-4">
              TOTAL: ${calculateTotal(order)}
            </h5>
            <Button className="mt-2" onClick={() => placeOrder()}>
              Place Order
            </Button>
          </>
        ) : (
          <p className="text-muted">No items added</p>
        )}
      </ListGroup>
    </div>
  );
}
