import Order from "../../models/order";
import { ADD_ORDER, GET_ORDERS } from "../actions/types";

const ORDERS_INITIAL_STATE = {
  orders: [],
};

export default (
  state = ORDERS_INITIAL_STATE,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case GET_ORDERS:
      return {
        orders: payload,
      };

    case ADD_ORDER:
      const newOrder: any = new Order(payload.id, payload.items, payload.amount, payload.date);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    default:
      return state;
  }
};
