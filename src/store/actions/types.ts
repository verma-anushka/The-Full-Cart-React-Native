export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

export interface ProductInterface {
  id: string;
  ownerId: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

export interface CartItemInterface {
  quantity: number;
  productPrice: number;
  productTitle: string;
  sum: number;
}

export interface CartInterface {
  id: CartItemInterface;
}
