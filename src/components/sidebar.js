import React from "react";
import { useSelector } from "react-redux";
import { Receipt } from "./";

export default () => {
  const step = useSelector(state => state.step);
  const data = useSelector(state => state.inputtedData);

  return data.paymentTerm && step < 6 ? <Receipt /> : null;
};
