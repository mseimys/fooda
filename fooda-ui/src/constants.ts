export const API = {
  SIGNUP: "/api/signup/",
  TOKEN: "/api/token/",
  USER: "/api/users/me/",
  RESTAURANT: (restaurantId: string) => `/api/restaurants/${restaurantId}/`,
  RESTAURANTS: "/api/restaurants/",
  ORDER: (orderId: string) => `/api/orders/${orderId}/`,
  ORDERS: "/api/orders/",
};
