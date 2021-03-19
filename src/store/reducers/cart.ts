import CartItem from "../../models/cartItem";
import { ADD_ORDER, ADD_TO_CART, CartItemInterface, REMOVE_FROM_CART } from "../actions/types";

interface CardState {
  items: any;
  total: number;
}

const CART_INITIAL_STATE: CardState = {
  items: {}, // list of all products in user cart { productID: { title: "", quantity: "", price:"" } }
  total: 0,
};

export default (
  state: CardState = CART_INITIAL_STATE,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    case ADD_TO_CART:
      let cartItem: CartItemInterface;
      if (state.items[payload.id]) {
        cartItem = new CartItem({
          quantity: state.items[payload.id].quantity + 1,
          productPrice: payload.price,
          productTitle: payload.title,
          sum: state.items[payload.id].sum + payload.price,
        });
      } else {
        cartItem = new CartItem({
          quantity: 1,
          productPrice: payload.price,
          productTitle: payload.title,
          sum: payload.price,
        });
      }

      return {
        ...state,
        items: { ...state.items, [payload.id]: cartItem },
        total: state.total + payload.price,
      };

    case REMOVE_FROM_CART:
      const selectedItem = state.items[payload];
      let updatedCartItems;
      if (selectedItem.quantity > 1) {
        const updatedCartItem = new CartItem({
          quantity: selectedItem.quantity - 1,
          productPrice: selectedItem.productPrice,
          productTitle: selectedItem.productTitle,
          sum: selectedItem.sum - selectedItem.productPrice,
        });
        updatedCartItems = { ...state.items, [payload]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        total: state.total - selectedItem.productPrice,
      };

    case ADD_ORDER:
      return CART_INITIAL_STATE;

    default:
      return state;
  }
};
