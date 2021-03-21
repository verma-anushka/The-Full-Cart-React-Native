import { DELETE_PRODUCT } from "./types";
// import Product from "../../models/product";

export const deleteProduct = (productId: string) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};
