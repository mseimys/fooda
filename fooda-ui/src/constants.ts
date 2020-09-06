export const API = {
  SIGNUP: "/api/signup/",
  TOKEN: "/api/token/",
  ME: "/api/users/me/",
  USER: (userId: string | number) => `/api/users/${userId}/`,
  BLOCKED_USERS: "/api/blocked_users/",
  BLOCKED_USER: (id: number) => `/api/blocked_users/${id}/`,
  RESTAURANT: (restaurantId: string | number) =>
    `/api/restaurants/${restaurantId}/`,
  RESTAURANTS: "/api/restaurants/",
  ORDER: (orderId: string | number) => `/api/orders/${orderId}/`,
  ORDERS: "/api/orders/",
  MEAL: (mealId: string | number) => `/api/meals/${mealId}/`,
  MEALS: "/api/meals/",
};
