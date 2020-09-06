import React, { useContext } from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import { RootContext } from "./context";
import Dashboard from "./Dashboard/Dashboard";
import OrderList from "./Orders/OrderList";
import NewRestaurant from "./Restaurants/NewRestaurant";
import RestaurantList from "./Restaurants/RestaurantList";
import RestaurantDetails from "./Restaurants/RestaurantDetails";
import Login from "./User/Login";
import Signup from "./User/Signup";

function PrivateRoute({ children, ...rest }: RouteProps) {
  const { user } = useContext(RootContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.anonymous ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <Container className="py-4">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/orders">
          <OrderList />
        </PrivateRoute>
        <PrivateRoute exact path="/restaurants/new">
          <NewRestaurant />
        </PrivateRoute>
        <PrivateRoute exact path="/restaurants/:restaurantId">
          <RestaurantDetails />
        </PrivateRoute>
        <PrivateRoute path="/restaurants">
          <RestaurantList />
        </PrivateRoute>
      </Switch>
    </Container>
  );
}
