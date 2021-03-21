import PRODUCTS from "../../data/dummy";
import Product from "../../models/product";
import { DELETE_PRODUCT } from "../actions/types";

const PRODUCTS_INITIAL_STATE = {
  availableProducts: PRODUCTS, // list of all products
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"), // list of logged in user's created products
};

export default (
  state = PRODUCTS_INITIAL_STATE,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product: Product) => product.id !== payload,
        ),
        userProducts: state.userProducts.filter((product: Product) => product.id !== payload),
      };

    default:
      return state;
  }
};
