import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, CardColumns, Spinner } from "react-bootstrap";
import { findIndex } from "lodash";

import { Order, OrderItem, OrderStatus } from "../Orders/service";
import restaurantService, { Restaurant, Meal } from "./service";
import ActiveOrder from "./ActiveOrder";
import { RootContext } from "../context";
import MealItem from "./MealItem";

const addMealToOrder = (meal: Meal, order: Order) => {
  const items = [...order.items];
  const index = findIndex(items, (item: OrderItem) => item.meal.id === meal.id);
  if (index === -1) {
    items.push({ meal, count: 1 });
  } else {
    items[index].count += 1;
  }
  return { ...order, items };
};

const removeMealFromOrder = (meal: Meal, order: Order) => {
  const items = [...order.items];
  const index = findIndex(items, (item: OrderItem) => item.meal.id === meal.id);
  if (index !== -1) {
    if (items[index].count > 1) {
      items[index].count -= 1;
    } else {
      items.splice(index, 1);
    }
  }
  return { ...order, items };
};

export default function RestaurantDetails() {
  const { restaurantId } = useParams();
  const { user } = useContext(RootContext);

  const [order, setOrder] = useState<Order>({
    id: 0,
    user: user.id,
    restaurant: Number(restaurantId),
    items: [],
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

  const addMeal = (meal: Meal) => setOrder(addMealToOrder(meal, order));
  const removeMeal = (meal: Meal) => setOrder(removeMealFromOrder(meal, order));

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
          {restaurant.meals.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              addToOrder={() => addMeal(meal)}
            />
          ))}
        </CardColumns>
      </Col>
    </Row>
  );
}
