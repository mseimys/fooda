import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { Order, calculateTotal } from "./service";
import { formatDate, formatAgo } from "../utils";

export type OrderListItemProps = {
  order: Order;
};

export default function OrderListItem({ order }: OrderListItemProps) {
  return (
    <Row className="my-2">
      <Col xs={2}>
        <Link to={`/orders/${order.id}`}>Order #{order.id}</Link>
      </Col>
      <Col xs={1}>{order.items.length}</Col>
      <Col xs={1}>{calculateTotal(order)}</Col>
      <Col xs={3}>{formatDate(order.created)}</Col>
      <Col xs={2}>{order.status}</Col>
      <Col xs={2}>{formatAgo(order.updated)}</Col>
      <Col xs={1}></Col>
    </Row>
  );
}
