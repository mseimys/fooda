import { axios } from "../axios";
import { API } from "../constants";

export type Restaurant = {
  id: number;
  owner: number;
  name: string;
  description: string;
};

async function getRestaurants() {
  return (await axios.get<Restaurant[]>(API.RESTAURANTS)).data;
}

async function getRestaurant(restaurantId: string) {
  return (await axios.get<Restaurant>(API.RESTAURANT(restaurantId))).data;
}

export default {
  getRestaurants,
  getRestaurant,
};
