import { GET_SUBSCRIPTION_OPTIONS, RESET_DATA } from "../../constants";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION_OPTIONS:
      return { ...state, ...action.payload };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
