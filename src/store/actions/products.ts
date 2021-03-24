import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT } from "./types";
// import Product from "../../models/product";

export const deleteProduct = (productId: string) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number,
) => {
  return {
    type: CREATE_PRODUCT,
    payload: { title, description, imageUrl, price },
  };
};

export const editProduct = (
  productId: string,
  title: string,
  description: string,
  imageUrl: string,
) => {
  return {
    type: EDIT_PRODUCT,
    payload: { id: productId, data: { title, description, imageUrl } },
  };
};
