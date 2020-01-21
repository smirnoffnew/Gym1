import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    textAlign: "right",
    height: 16,
    minWidth: 54,
    fontWeight: "bold"
  },
  price: {
    fontSize: 24,
    lineHeight: "22px",
    letterSpacing: -1,
    [theme.breakpoints.down("sm")]: {
      fontSize: 17,
      lineHeight: "16px"
    }
  },
  period: {
    fontSize: 10,
    color: "#99877C",
    lineHeight: "16px",
    fontFamily: "DINOT-Bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 8,
      lineHeight: "14px"
    }
  }
}));

export default ({ price, period, plus, style = {} }) => {
  const classes = useStyles();
  const renderedPrice = `${String(price).slice(0, -2)},${String(price).slice(
    -2
  )}`;

  const renderData = () => {
    return (
      <>
        {plus && "+"}
        {renderedPrice}
      </>
    );
  };

  return (
    price && (
      <div className={classes.wrapper} style={{ ...style }}>
        <div className={classes.price}>{renderData()}</div>
        <div className={classes.period}>{period}</div>
      </div>
    )
  );
};
