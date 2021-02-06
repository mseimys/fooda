const API_ROOT = process.env.REACT_APP_API_ROOT || "https://api.seimys.net";

export const API = {
  SIGNUP: API_ROOT + "/signup/",
  TOKEN: API_ROOT + "/token/",
  ME: API_ROOT + "/users/me/",
  USER: (userId: string | number) => `${API_ROOT}/users/${userId}/`,
  BLOCKED_USERS: API_ROOT + "/blocked_users/",
  BLOCKED_USER: (id: number) => `${API_ROOT}/blocked_users/${id}/`,
  RESTAURANT: (restaurantId: string | number) =>
    `${API_ROOT}/restaurants/${restaurantId}/`,
  RESTAURANTS: API_ROOT + "/restaurants/",
  ORDER: (orderId: string | number) => `${API_ROOT}/orders/${orderId}/`,
  ORDERS: API_ROOT + "/orders/",
  MEAL: (mealId: string | number) => `${API_ROOT}/meals/${mealId}/`,
  MEALS: API_ROOT + "/meals/",
};
