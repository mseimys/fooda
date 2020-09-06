import React, { useContext } from "react";
import { Button, Badge } from "react-bootstrap";

import { UserType, RootContext } from "../context";
import orderService, { OrderStatus } from "./service";
import { OrderListItemProps } from "./OrderListItem";

async function callApi(orderId: number, newStatus: OrderStatus) {
  return await orderService.updateOrderStatus(orderId, newStatus);
}

export const orderStatus = (status: OrderStatus): React.ReactNode => {
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

export function NextAction({
  order: { id, status },
  refresh,
}: OrderListItemProps) {
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
