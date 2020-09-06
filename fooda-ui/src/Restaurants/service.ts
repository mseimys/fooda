import { axios } from "../axios";
import { API } from "../constants";

export type Meal = {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant: number;
};

export type Restaurant = {
  id: number;
  owner: number;
  name: string;
  description: string;
  meals: Meal[];
};

async function getRestaurants() {
  return (await axios.get<Restaurant[]>(API.RESTAURANTS)).data;
}

async function createRestaurant(data: Restaurant) {
  return (await axios.post<Restaurant>(API.RESTAURANTS, data)).data;
}

async function getRestaurant(restaurantId: string) {
  return (await axios.get<Restaurant>(API.RESTAURANT(restaurantId))).data;
}

async function updateRestaurant(restaurantId: string, data: Restaurant) {
  return (await axios.put<Restaurant>(API.RESTAURANT(restaurantId), data)).data;
}

async function deleteRestaurant(restaurantId: string) {
  return (await axios.delete<Restaurant>(API.RESTAURANT(restaurantId))).data;
}

async function createMeal(data: Meal) {
  return (await axios.post<Meal>(API.MEALS, data)).data;
}

async function getMeal(mealId: string) {
  return (await axios.get<Meal>(API.MEAL(mealId))).data;
}

async function updateMeal(mealId: string, data: Meal) {
  return (await axios.put<Meal>(API.MEAL(mealId), data)).data;
}

export default {
  getRestaurants,
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createMeal,
  getMeal,
  updateMeal,
};
