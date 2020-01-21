import { INPUT_FORM_DATA, RESET_DATA } from "../../constants";

const initialState = {
  gender: null,
  firstName: "",
  lastName: "",
  date: "none",
  month: "none",
  year: "none",
  postcode: "",
  houseNumber: "",
  houseNumberAddition: "",
  street: "",
  city: "",
  telephone: "",
  email: "",
  condition1: false,
  condition2: false,
  condition3: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_FORM_DATA:
      return { ...state, ...action.payload };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
