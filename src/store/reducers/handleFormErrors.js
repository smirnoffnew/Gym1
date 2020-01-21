import { HANDLE_ERROR } from "../../constants";

const initialState = {
  gender: null,
  firstName: null,
  lastName: null,
  date: null,
  month: null,
  year: null,
  postcode: null,
  houseNumber: null,
  street: null,
  city: null,
  telephone: null,
  email: null,
  condition1: null,
  condition2: null,
  condition3: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
