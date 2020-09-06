import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import orderService, { Order } from "./service";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    orderService.getOrder(orderId).then((order) => {
      setOrder(order);
    });
  }, [orderId]);

  if (!order) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <h1>Order #{order.id}</h1>
      <p>{JSON.stringify(order)}</p>
    </div>
  );
}
