import { axios } from "../axios";
import { API } from "../constants";
import { Meal } from "../Restaurants/service";
import { reduce } from "lodash";

export enum OrderStatus {
  PLACED = "PLACED",
  CANCELED = "CANCELED",
  PROCESSING = "PROCESSING",
  IN_ROUTE = "IN_ROUTE",
  DELIVERED = "DELIVERED",
  RECEIVED = "RECEIVED",
}

export type OrderItem = {
  id?: number;
  meal: Meal;
  count: number;
};

export type Order = {
  id?: number;
  user: number;
  restaurant: number;
  created?: string;
  updated?: string;
  items: OrderItem[];
  status: OrderStatus;
};

export const isFinished = (order: Order) =>
  order.status === OrderStatus.CANCELED ||
  order.status === OrderStatus.DELIVERED;

export const calculateTotal = (order: Order): string => {
  const total = reduce(
    order.items,
    (total, item) => total + item.count * item.meal.price,
    0.0
  );
  return (Math.round(total * 100) / 100).toFixed(2);
};

async function getOrders() {
  return (await axios.get<Order[]>(API.ORDERS)).data;
}

async function createOrder(data: Order) {
  return (await axios.post<Order>(API.ORDERS, data)).data;
}

async function getOrder(orderId: string) {
  return (await axios.get<Order>(API.ORDER(orderId))).data;
}

export default {
  getOrders,
  createOrder,
  getOrder,
};
