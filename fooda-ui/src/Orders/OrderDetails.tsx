import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Row, Col, Spinner } from "react-bootstrap";

import userService from "../User/service";
import orderService, { Order, calculateTotal, calculateItems } from "./service";
import { RootContext, UserType, User } from "../context";
import { formatDate, formatAgo } from "../utils";
import { orderStatus, NextAction } from "./helpers";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order>();
  const [orderUser, setOrderUser] = useState<User>();
  const [message, setMessage] = useState("");
  const history = useHistory();
  const {
    user: { user_type },
  } = useContext(RootContext);

  useEffect(() => {
    orderService.getOrder(orderId).then((order) => {
      setOrder(order);
    });
  }, [orderId]);

  useEffect(() => {
    order &&
      userService.getUser(order.user).then((fetchedUser) => {
        setOrderUser(fetchedUser);
      });
  }, [order]);

  const blockUser = () => {
    order &&
      userService.blockUser(order.restaurant, order.user).then(() => {
        setMessage("User has been blocked!");
      });
  };

  if (!order) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <h1>
        Order #{order.id} {orderStatus(order.status)}
      </h1>
      <div className="my-4">
        <NextAction order={order} refresh={() => history.push("/orders")} />
        {user_type === UserType.OWNER && (
          <Button size="sm" className="ml-4" onClick={() => blockUser()}>
            Block user {orderUser?.username}
          </Button>
        )}
      </div>
      <p className="text-success">{message}</p>
      <Row>
        <Col xs={3} className="h5">
          Order created
        </Col>
        <Col>{formatDate(order.created)}</Col>
      </Row>
      <Row>
        <Col xs={3} className="h5">
          Order updated
        </Col>
        <Col>
          {formatDate(order.updated)} ({formatAgo(order.updated)})
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="h5">
          Total items
        </Col>
        <Col>{calculateItems(order)}</Col>
      </Row>
      <Row>
        <Col xs={3} className="h5">
          Total amount
        </Col>
        <Col>${calculateTotal(order)}</Col>
      </Row>
      <h2 className="mt-4">Order History</h2>
      <div className="w-75">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {order.history_items?.map((item) => (
              <tr key={item.id}>
                <td>{formatDate(item.created)}</td>
                <td>{item.user.username}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
