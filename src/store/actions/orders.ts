import { ADD_ORDER, ProductInterface } from "./types";

export const addOrder = (cartItems: ProductInterface, totalAmount: number) => {
  return {
    type: ADD_ORDER,
    payload: { items: cartItems, amount: totalAmount },
  };
};
