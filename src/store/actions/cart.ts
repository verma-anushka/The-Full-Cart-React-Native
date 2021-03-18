import { ADD_TO_CART, ProductInterface, REMOVE_FROM_CART } from "./types";
// import Product from "../../models/product";

export const addToCart = (product: ProductInterface) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId: string) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};
