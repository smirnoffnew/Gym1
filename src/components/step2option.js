import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INPUT_STEP2_OPTION } from "../constants";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "0 10px 10px 0",
    cursor: "pointer",
    width: 143,
    height: 84,
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.1)",
    borderRadius: 2,
    padding: "20px 8px 0 43px",
    fontSize: 17,
    fontWeight: "bold",
    lineHeight: "16px",
    letterSpacing: -1,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 20px 0px"
    }
  },
  checkbox: {
    position: "absolute",
    top: 6,
    left: 3,

    "& path": {
      transform: "scale(1.45) translate(-4px, -4px) !important"
    },
    [theme.breakpoints.down("sm")]: {
      left: 2
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
  }
}));

export default ({ title, option, id, checked, onClick = null }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const step2options = useSelector(state => state.step2options);

  const handleClick = option => {
    dispatch({
      type: INPUT_STEP2_OPTION,
      payload: {
        [id]: {
          state: !step2options[id].state,
          name: option
        }
      }
    });
  };

  return (
    <div
      className={`${classes.card} step2_option_card`}
      style={{
        background: checked ? theme.palette.secondary.light : "white"
      }}
      onClick={() => (onClick ? onClick() : handleClick(option))}
    >
      <Checkbox
        label="My checkbox"
        style={{ color: "#EEEEEE" }}
        checked={checked}
        className={`${classes.checkbox} ${
          checked ? classes.checked : classes.unchecked
        }`}
      />
      {title}
    </div>
  );
};
