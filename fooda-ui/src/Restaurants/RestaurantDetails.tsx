import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import restaurantService, { Restaurant } from "./service";

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurantService.getRestaurant(restaurantId).then((restaurants) => {
      setRestaurant(restaurants);
      setLoading(false);
    });
  }, [restaurantId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Row>
      <div className="pl-3">
        <img
          src={`https://picsum.photos/seed/${restaurant?.id}/300/200`}
          className="mb-4 round"
          alt="Restaurant Logo"
        />
        <h1>{restaurant?.name}</h1>
        <p>{restaurant?.description}</p>
      </div>
      <Col>Menu</Col>
    </Row>
  );
}
