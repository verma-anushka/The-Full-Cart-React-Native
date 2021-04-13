import { combineReducers } from "redux";
import productsReducer from "./products";
import cartReducer from "./cart";
import ordersReducer from "./orders";
import authReducer from "./auth";

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  orders: ordersReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
