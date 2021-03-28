import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS } from "./types";
import Product from "../../models/product";

export const getProducts = () => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        "https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      const products = [];

      for (const key in data) {
        products.push(
          new Product(
            key,
            "u1",
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            data[key].price,
          ),
        );
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        `https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`,
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
  return async (dispatch: any) => {
    const res = await fetch(
      "https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
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
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: data.name, title, description, imageUrl, price },
    });
  };
};

export const editProduct = (
  productId: string,
  title: string,
  description: string,
  imageUrl: string,
) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        `https://the-full-cart-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`,
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
