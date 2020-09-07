import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

import OrderListItem, { OrderListHeader } from "./OrderListItem";
import orderService, { Order, isFinished } from "./service";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>();
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    orderService.getOrders().then((orders) => {
      setOrders(orders);
    });
  }, [refresh]);

  if (!orders) {
    return <Spinner animation="border" />;
  }

  const activeOrders = orders.filter((order) => !isFinished(order));
  const finishedOrders = orders.filter(isFinished);

  return (
    <div>
      <h3 className="mb-4">Active Orders</h3>
      {activeOrders.length === 0 ? (
        <p className="text-muted">No active orders</p>
      ) : (
        <>
          <OrderListHeader />
          {activeOrders.map((order) => (
            <OrderListItem
              key={order.id}
              order={order}
              refresh={() => setRefresh(refresh + 1)}
            />
          ))}
        </>
      )}
      <hr />
      <h4 className="mb-4">Finished Orders</h4>
      {finishedOrders.length === 0 ? (
        <p className="text-muted">No finished orders</p>
      ) : (
        <>
          <OrderListHeader />
          {finishedOrders.map((order) => (
            <OrderListItem key={order.id} order={order} />
          ))}
        </>
      )}
    </div>
  );
}
