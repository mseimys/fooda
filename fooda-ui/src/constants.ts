export const API = {
  SIGNUP: "/api/signup/",
  TOKEN: "/api/token/",
  USER: "/api/users/me/",
  RESTAURANT: (restaurantId: string | number) =>
    `/api/restaurants/${restaurantId}/`,
  RESTAURANTS: "/api/restaurants/",
  ORDER: (orderId: string | number) => `/api/orders/${orderId}/`,
  ORDERS: "/api/orders/",
};
