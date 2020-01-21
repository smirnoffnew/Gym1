import { INPUT_STEP2_OPTION, RESET_DATA } from "../../constants";

const initialState = {
  a: {
    state: false,
    name: "fitness"
  },
  b: {
    state: false,
    name: "pause"
  },
  c: {
    state: false,
    name: "friend"
  },
  d: {
    state: false,
    name: "group"
  },
  e: {
    state: false,
    name: "share"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_STEP2_OPTION:
      return { ...state, ...action.payload };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
