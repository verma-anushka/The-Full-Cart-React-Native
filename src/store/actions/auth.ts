import { AUTHENTICATE } from "./types";

export const authenticate = (userId: string, token: string, expiryTime: number) => {
  return (dispatch: any) => {
    dispatch({ type: AUTHENTICATE, payload: { userId: userId, token: token } });
  };
};

export const signup = (email: string, password: string) => {
  return async (dispatch: any) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRoxog05G_FRlT2WXKOVzA0t2MLep2aOk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!res.ok) {
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "Given email already exists!";
      }
      throw new Error(message);
    }

    const data = await res.json();
    // console.log(data);
    dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRoxog05G_FRlT2WXKOVzA0t2MLep2aOk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!res.ok) {
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Given email does not exist!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Incorrect password!";
      }
      throw new Error(message);
    }

    const data = await res.json();
    // console.log(data);
    dispatch(authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
  };
};
