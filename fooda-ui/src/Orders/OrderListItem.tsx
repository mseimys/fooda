import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Badge } from "react-bootstrap";

import { UserType, RootContext } from "../context";
import orderService, { Order, OrderStatus, calculateTotal } from "./service";
import { formatDate, formatAgo } from "../utils";

export type OrderListItemProps = {
  order: Order;
  refresh?: () => void;
};

async function callApi(orderId: number, newStatus: OrderStatus) {
  return orderService.updateOrderStatus(orderId, newStatus);
}

const orderStatus = (status: OrderStatus): React.ReactNode => {
  switch (status) {
    case OrderStatus.PLACED:
      return <Badge variant="info">Placed</Badge>;
    case OrderStatus.CANCELED:
      return <Badge variant="secondary">Canceled</Badge>;
    case OrderStatus.PROCESSING:
      return <Badge variant="primary">Processing</Badge>;
    case OrderStatus.IN_ROUTE:
      return <Badge variant="warning">In Route</Badge>;
    case OrderStatus.DELIVERED:
      return <Badge variant="danger">Delivered</Badge>;
    case OrderStatus.RECEIVED:
      return <Badge variant="secondary">Received</Badge>;
    default:
      return null;
  }
};

function NextAction({ order: { id, status }, refresh }: OrderListItemProps) {
  const {
    user: { user_type },
  } = useContext(RootContext);

  let nextAction: Function | null = null;
  let nextActionText = "";

  switch (status) {
    case OrderStatus.PLACED: {
      if (user_type === UserType.REGULAR) {
        nextAction = () => callApi(id!, OrderStatus.CANCELED);
        nextActionText = "Cancel Order";
      } else {
        nextAction = () => callApi(id!, OrderStatus.PROCESSING);
        nextActionText = "Start Processing";
      }
      break;
    }
    case OrderStatus.PROCESSING: {
      if (user_type === UserType.OWNER) {
        nextAction = () => callApi(id!, OrderStatus.IN_ROUTE);
        nextActionText = "In route";
      }
      break;
    }
    case OrderStatus.IN_ROUTE: {
      if (user_type === UserType.OWNER) {
        nextAction = () => callApi(id!, OrderStatus.DELIVERED);
        nextActionText = "Mark as Delivered";
      }
      break;
    }
    case OrderStatus.DELIVERED: {
      if (user_type === UserType.REGULAR) {
        nextAction = () => callApi(id!, OrderStatus.RECEIVED);
        nextActionText = "Mark as Received";
      }
      break;
    }
  }

  return nextAction ? (
    <Button
      size="sm"
      variant="secondary"
      onClick={async () => {
        if (nextAction && refresh) {
          await nextAction();
          refresh();
        }
      }}
    >
      {nextActionText}
    </Button>
  ) : null;
}

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
      <Col xs={1}>{order.items.length}</Col>
      <Col xs={1}>{calculateTotal(order)}</Col>
      <Col xs={3}>{formatDate(order.created)}</Col>
      <Col xs={1}>{orderStatus(order.status)}</Col>
      <Col xs={2}>{formatAgo(order.updated)}</Col>
      <Col xs={2}>
        <NextAction order={order} refresh={refresh} />
      </Col>
    </Row>
  );
}
