export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const ADD_ORDER = "ADD_ORDER";

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
