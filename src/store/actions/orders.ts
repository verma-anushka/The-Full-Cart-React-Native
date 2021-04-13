import Order from "../../models/order";
import { ADD_ORDER, GET_ORDERS, ProductInterface } from "./types";

export const getOrders = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const userId = getState().auth.userId;

      const res = await fetch(
        `https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`,
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      const orders = [];

      for (const key in data) {
        orders.push(
          new Order(key, data[key].cartItems, data[key].totalAmount, new Date(data[key].date)),
        );
      }
      dispatch({
        type: GET_ORDERS,
        payload: orders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems: ProductInterface, totalAmount: number) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const res = await fetch(
      `https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();
    dispatch({
      type: ADD_ORDER,
      payload: { id: data.name, items: cartItems, amount: totalAmount, date },
    });
  };
};
