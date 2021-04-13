import PRODUCTS from "../../data/dummy";
import Product from "../../models/product";
import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS } from "../actions/types";

const PRODUCTS_INITIAL_STATE = {
  availableProducts: PRODUCTS, // list of all products
  userProducts: PRODUCTS, // list of logged in user's created products
};

export default (
  state = PRODUCTS_INITIAL_STATE,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case GET_PRODUCTS:
      return {
        availableProducts: payload.products,
        userProducts: payload.userProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product: Product) => product.id !== payload,
        ),
        userProducts: state.userProducts.filter((product: Product) => product.id !== payload),
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        payload.id,
        payload.ownerId,
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };

    case EDIT_PRODUCT:
      const productIdx = state.userProducts.findIndex(
        (product: Product) => product.id === payload.id,
      );
      const updatedProduct = new Product(
        payload.id,
        state.userProducts[productIdx].ownerId,
        payload.data.title,
        payload.data.imageUrl,
        payload.data.description,
        state.userProducts[productIdx].price,
      );

      console.log(state.userProducts[productIdx].price);

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIdx] = updatedProduct;
      const availableProductIdx = state.availableProducts.findIndex(
        (product: Product) => product.id === payload.id,
      );
      const updatedAvailabilityProducts = [...state.availableProducts];
      updatedAvailabilityProducts[availableProductIdx] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailabilityProducts,
        userProducts: updatedUserProducts,
      };
    default:
      return state;
  }
};
