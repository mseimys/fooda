import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { Order, calculateTotal, calculateItems } from "./service";
import { formatDate, formatAgo } from "../utils";
import { orderStatus, NextAction } from "./helpers";

export type OrderListItemProps = {
  order: Order;
  refresh?: () => void;
};

export function OrderListHeader() {
  return (
    <Row className="my-2 font-weight-bold">
      <Col>Order ID</Col>
      <Col xs={1}>Items</Col>
      <Col xs={1}>Total</Col>
      <Col xs={3}>Created</Col>
      <Col xs={1}>Status</Col>
      <Col xs={2}>Updated</Col>
      <Col xs={2}></Col>
    </Row>
  );
}

export default function OrderListItem({ order, refresh }: OrderListItemProps) {
  return (
    <Row className="order-row d-flex align-items-center">
      <Col xs={2}>
        <Link to={`/orders/${order.id}`}>Order #{order.id}</Link>
      </Col>
      <Col xs={1}>{calculateItems(order)}</Col>
      <Col xs={1}>${calculateTotal(order)}</Col>
      <Col xs={3}>{formatDate(order.created)}</Col>
      <Col xs={1}>{orderStatus(order.status)}</Col>
      <Col xs={2}>{formatAgo(order.updated)}</Col>
      <Col xs={2}>
        <NextAction order={order} refresh={refresh} />
      </Col>
    </Row>
  );
}
