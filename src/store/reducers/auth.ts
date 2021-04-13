import { AUTHENTICATE, LOGOUT } from "../actions/types";

const AUTH_INITIAL_STATE = {
  token: null,
  userId: null,
};

export default (state = AUTH_INITIAL_STATE, { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case AUTHENTICATE:
      return {
        token: payload.token,
        userId: payload.userId,
      };
    case LOGOUT:
      return AUTH_INITIAL_STATE;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
