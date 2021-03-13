import PRODUCTS from "../../data/dummy";

const PRODUCTS_INITIAL_STATE = {
  availableProducts: PRODUCTS, // list of all products
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"), // list of logged in user's created products
};

export default (
  state = PRODUCTS_INITIAL_STATE,
  { type, payload }: { type: string; payload: any },
) => {
  switch (type) {
    default:
      return state;
  }
};
