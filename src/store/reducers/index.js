import { combineReducers } from "redux";
import handleStep from "./handleStep";
import handleInputtedData from "./handleInputtedData";
import handleSubscriptionOptions from "./handleSubscriptionOptions";
import handleFormData from "./handleFormData";
import handleFormErrors from "./handleFormErrors";
import handleStep2Options from "./handleStep2Options";

export default combineReducers({
  step: handleStep,
  inputtedData: handleInputtedData,
  subscriptionOptions: handleSubscriptionOptions,
  formData: handleFormData,
  errors: handleFormErrors,
  step2options: handleStep2Options
});
