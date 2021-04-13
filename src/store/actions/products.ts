import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
  ProductInterface,
} from "./types";
import Product from "../../models/product";

export const getProducts = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const userId = getState().auth.userId;
      const res = await fetch(
        "https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      const products: ProductInterface[] = [];

      for (const key in data) {
        products.push(
          new Product(
            key,
            data[key].ownerId,
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            data[key].price,
          ),
        );
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: { products, userProducts: products.filter((prod) => prod.ownerId === userId) },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: DELETE_PRODUCT,
        payload: productId,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const res = await fetch(
      `https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: data.name, title, description, imageUrl, price, ownerId: userId },
    });
  };
};

export const editProduct = (
  productId: string,
  title: string,
  description: string,
  imageUrl: string,
) => {
  return async (dispatch: any, getState: any) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(
        `https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      dispatch({
        type: EDIT_PRODUCT,
        payload: { id: productId, data: { title, description, imageUrl } },
      });
    } catch (err) {
      throw err;
    }
  };
};
