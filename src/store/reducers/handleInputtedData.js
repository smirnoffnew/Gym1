import {
  INPUT_DATA,
  INPUT_EXTRA,
  REMOVE_AN_EXTRA,
  RESET_DATA
} from "../../constants";

const initialState = {
  extra: {},
  plan: null,
  venue: {
    name: "",
    id: null
  },
  dataError: null,
  digitalCoach: false,
  isExtraIncluded: null,
  price: null,
  period: null,
  paymentTerm: null,
  removeSidePaddings: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_DATA:
      return { ...state, ...action.payload };
    case INPUT_EXTRA:
      return {
        ...state,
        extra: { ...state.extra, ...action.payload }
      };
    case REMOVE_AN_EXTRA:
      const newExtraList = state.extra;
      delete newExtraList[action.payload];
      return {
        ...state,
        extra: { ...newExtraList }
      };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
