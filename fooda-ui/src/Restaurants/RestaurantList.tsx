import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, CardColumns, Button } from "react-bootstrap";

import { RootContext, UserType } from "../context";
import restaurantService, { Restaurant } from "./service";

type RestaurantProp = {
  restaurant: Restaurant;
  owner?: boolean;
};

function RestaurantListItem({ restaurant, owner }: RestaurantProp) {
  const history = useHistory();
  return (
    <Card style={{ width: "300px" }}>
      <Card.Img
        variant="top"
        src={`https://picsum.photos/seed/${restaurant.id}/300/200`}
      />
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>{restaurant.description}</Card.Text>
        <Button
          variant="primary"
          onClick={() => history.push(`/restaurants/${restaurant.id}`)}
        >
          {owner ? "Manage" : "Order Food"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default function RestaurantList() {
  const { user } = useContext(RootContext);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [myRestaurants, setMyRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    restaurantService.getRestaurants().then((restaurants) => {
      const my = restaurants.filter(
        (restaurant) => restaurant.owner === user.id
      );
      const other = restaurants.filter(
        (restaurant) => restaurant.owner !== user.id
      );
      setMyRestaurants(my);
      setRestaurants(other);
    });
  }, [user]);

  return (
    <div>
      {user.user_type === UserType.OWNER && (
        <div>
          <h1 className="mb-4">
            My Restaurants
            <Link
              className="btn btn-sm btn-primary float-right"
              to={"/restaurants/new"}
            >
              Create New
            </Link>
          </h1>
          <CardColumns>
            {myRestaurants.map((restaurant) => (
              <RestaurantListItem
                key={restaurant.id}
                restaurant={restaurant}
                owner
              />
            ))}
          </CardColumns>
        </div>
      )}
      <h1 className="my-4">Restaurants</h1>
      <CardColumns>
        {restaurants.map((restaurant) => (
          <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </CardColumns>
    </div>
  );
}
