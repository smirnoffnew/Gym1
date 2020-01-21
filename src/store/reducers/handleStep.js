import { CHANGE_STEP, RESET_STEPPER } from "../../constants";

const initialState = 1;

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STEP:
      return action.payload;
    case RESET_STEPPER:
      return initialState;
    default:
      return state;
  }
};
