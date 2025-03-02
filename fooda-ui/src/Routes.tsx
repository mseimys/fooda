import React, { useContext } from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import { RootContext } from "./context";
import OrderList from "./Orders/OrderList";
import OrderDetails from "./Orders/OrderDetails";
import EditRestaurant from "./Restaurants/EditRestaurant";
import RestaurantList from "./Restaurants/RestaurantList";
import RestaurantDetails from "./Restaurants/RestaurantDetails";
import EditMeal from "./Restaurants/EditMeal";
import Login from "./User/Login";
import Signup from "./User/Signup";
import UserList from "./User/UserList";

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
          <Redirect to={"/restaurants"} />
        </PrivateRoute>
        <PrivateRoute exact path="/orders">
          <OrderList />
        </PrivateRoute>
        <PrivateRoute path="/orders/:orderId">
          <OrderDetails />
        </PrivateRoute>
        <PrivateRoute exact path="/restaurants/new">
          <EditRestaurant isNew />
        </PrivateRoute>
        <PrivateRoute exact path="/restaurants/:restaurantId">
          <RestaurantDetails />
        </PrivateRoute>
        <PrivateRoute exact path="/restaurants/:restaurantId/edit">
          <EditRestaurant />
        </PrivateRoute>
        <PrivateRoute path="/restaurants">
          <RestaurantList />
        </PrivateRoute>
        <PrivateRoute path="/users">
          <UserList />
        </PrivateRoute>
        <PrivateRoute exact path="/meals/new">
          <EditMeal isNew />
        </PrivateRoute>
        <PrivateRoute exact path="/meals/:mealId">
          <EditMeal />
        </PrivateRoute>
      </Switch>
    </Container>
  );
}
