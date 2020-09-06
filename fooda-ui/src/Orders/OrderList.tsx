import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

import OrderListItem from "./OrderListItem";
import orderService, { Order, isFinished } from "./service";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    orderService.getOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  if (!orders) {
    return <Spinner animation="border" />;
  }

  const activeOrders = orders.filter((order) => !isFinished(order));
  const finishedOrders = orders.filter(isFinished);

  return (
    <div>
      <h3 className="mb-4">Active Orders</h3>
      {activeOrders.map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}
      <hr />
      <h4 className="mb-4">Order History</h4>
      {finishedOrders.length === 0 && (
        <p className="text-muted">No finished orders</p>
      )}
      {finishedOrders.map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}
    </div>
  );
}
