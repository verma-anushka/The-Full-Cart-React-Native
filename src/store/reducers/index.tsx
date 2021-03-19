import { combineReducers } from "redux";
import productsReducer from "./products";
import cartReducer from "./cart";
import ordersReducer from "./orders";

export const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
