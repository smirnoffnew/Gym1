import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INPUT_EXTRA, CHANGE_STEP } from "../constants";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import { PricePerPeriod } from ".";

const useStyles = makeStyles(theme => ({
  extraCard: {
    width: 354,
    marginBottom: 20,
    borderRadius: 2,
    padding: "19px 28px 33px 45px",
    minHeight: 170,
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.1)",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      padding: "20px 15px 20px 43px",
      width: "calc(50% - 10px)",
      minHeight: 170
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: 112,
      width: "100%",
      maxWidth: "100%",
      margin: "10px 0 0 0"
    }
  },
  header: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  checkbox: {
    position: "absolute",
    top: -8,
    left: -42,
    "& path": {
      transform: "scale(1.45) translate(-4px, -4px) !important"
    },
    [theme.breakpoints.down("sm")]: {
      top: -12
    }
  },
  checked: {
    "& svg": {
      background: "#58B998 !important",
      transform: "scale(0.7)"
    }
  },
  unchecked: {
    "& svg": {
      background: "#EEEEEE !important",
      transform: "scale(0.7)"
    }
  },
  title: {
    fontFamily: "DINOT-Bold",
    fontSize: 24,
    lineHeight: "28px",
    width: 200,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    letterSpacing: -1,
    [theme.breakpoints.down("sm")]: {
      width: 180,
      marginRight: 5,
      maxWidth: 180,
      fontSize: 17,
      lineHeight: "16px",
      height: 18
    }
  },
  description: {
    paddingTop: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      lineHeight: "20px"
    }
  }
}));

export default ({ title, description, price, period, option }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isChecked = useSelector(state => state.inputtedData.extra[option]);
  const data = useSelector(state => state.inputtedData);
  const handleCheckboxClick = () => {
    dispatch({ type: INPUT_EXTRA, payload: { [option]: !isChecked } });
    dispatch({ type: CHANGE_STEP, payload: data.paymentTerm === null ? 4 : 5 });
  };

  return (
    title && (
      <div
        className={classes.extraCard}
        style={{
          background: isChecked ? theme.palette.secondary.light : "white"
        }}
        onClick={handleCheckboxClick}
      >
        <div className={classes.header}>
          <Checkbox
            className={`${classes.checkbox} ${
              isChecked ? classes.checked : classes.unchecked
            }`}
            checked={!!isChecked}
            color="secondary"
            style={{ color: "#EEEEEE" }}
          />

          <div className={classes.title}>{title}</div>

          {price && period && (
            <PricePerPeriod price={price} period={period} plus />
          )}
        </div>

        {description && (
          <div className={classes.description}>{description}</div>
        )}
      </div>
    )
  );
};
