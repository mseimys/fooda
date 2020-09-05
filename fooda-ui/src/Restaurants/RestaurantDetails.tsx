import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, CardColumns, Spinner } from "react-bootstrap";

import { Order, OrderStatus } from "../Orders/service";
import restaurantService, { Restaurant, Meal } from "./service";
import ActiveOrder from "./ActiveOrder";
import { RootContext } from "../context";
import MealItem from "./MealItem";

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const { user } = useContext(RootContext);

  const [order, setOrder] = useState<Order>({
    user: user.id,
    restaurant: Number(restaurantId),
    meals: [],
    status: OrderStatus.PLACED,
  });
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restaurantService.getRestaurant(restaurantId).then((restaurants) => {
      setRestaurant(restaurants);
      setLoading(false);
    });
  }, [restaurantId]);

  if (!restaurant || loading) {
    return <Spinner animation="border" />;
  }

  const addMeal = (meal: Meal) =>
    setOrder({ ...order, meals: [...order.meals, { ...meal }] });
  const removeMeal = (meal: Meal) => {
    const index = order.meals.indexOf(meal);
    order.meals.splice(index, 1);
    setOrder({ ...order, meals: [...order.meals] });
  };

  return (
    <Row>
      <Col md={4}>
        <div>
          <img
            src={`https://picsum.photos/seed/${restaurant.id}/300/200`}
            className="mb-4 round"
            alt="Restaurant Logo"
          />
          <h1>{restaurant.name}</h1>
          <p className="text-muted">{restaurant.description}</p>
        </div>
        <ActiveOrder order={order} addMeal={addMeal} removeMeal={removeMeal} />
      </Col>
      <Col md={8}>
        <CardColumns>
          {restaurant.meals.map((meal, index) => (
            <MealItem meal={meal} addToOrder={() => addMeal(meal)} />
          ))}
        </CardColumns>
      </Col>
    </Row>
  );
}
