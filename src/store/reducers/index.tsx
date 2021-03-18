import { combineReducers } from "redux";
import productsReducer from "./products";
import cartReducer from "./cart";

export const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
