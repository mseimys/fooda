import { Meal } from "../Restaurants/service";

export enum OrderStatus {
  PLACED = "PLACED",
  CANCELED = "CANCELED",
  PROCESSING = "PROCESSING",
  IN_ROUTE = "IN_ROUTE",
  DELIVERED = "DELIVERED",
  RECEIVED = "RECEIVED",
}

export type Order = {
  user: number;
  restaurant: number;
  meals: Meal[];
  status: OrderStatus;
};
