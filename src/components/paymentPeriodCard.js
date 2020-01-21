import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INPUT_DATA, CHANGE_STEP } from "../constants";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Radio } from "@material-ui/core";
import { CardHeader } from "../styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: 110,
    height: 110,
    borderRadius: 2,
    padding: "27.9px 25px 27px 43px",
    width: 200,
    marginRight: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 18px 20px 43px",
      width: "calc(50% - 8px)",
      marginRight: 0,
      marginBottom: 0,
      marginTop: 20,
      minWidth: 125
    }
  },
  xxscard: {
    width: "100% !important"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative"
  },
  title: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      fontSize: 17,
      lineHeight: "16px",
      fontWeight: "bold",
      paddingBottom: 5
    }
  },
  radio: {
    position: "absolute",
    top: -10,
    left: -41,
    transform: "scale(0.9)",
    "&>span:first-child>div>svg:first-child": {
      color: "#F3F0EF"
    },
    "&>span:first-child>div>svg:last-child": {
      transform: "scale(1.4)"
    },
    [theme.breakpoints.down("sm")]: {
      top: -13
    }
  },
  uncheckedRadio: {
    "&>span:first-child>div>svg:last-child": {
      color: "#F3F0EF",
      transform: "scale(1.7)"
    }
  },
  description: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "24px",
    [theme.breakpoints.down("sm")]: {
      "&>div:first-child": {
        fontSize: 13,
        lineHeight: "15px",
        color: "#58B998",
        paddingBottom: 5
      },
      "&>div:nth-child(2)": {
        fontSize: 8,
        lineHeight: "14px"
      }
    },
    "&>div:nth-child(2)": {
      fontSize: 10,
      color: "#99877C",
      lineHeight: "16px"
    }
  },
  crossed: {
    color: "#99877C !important"
  }
}));

export default ({ title, period, scrollToBottom, description }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const step = useSelector(state => state.step);
  const isChecked =
    useSelector(state => state.inputtedData.paymentTerm) === period;
  const matches = useMediaQuery("(max-width:340px)");

  const handleRadioClick = () => {
    if (isChecked) {
      dispatch({ type: INPUT_DATA, payload: { paymentTerm: null } });
      step === 5 && dispatch({ type: CHANGE_STEP, payload: 4 });
    } else {
      dispatch({ type: INPUT_DATA, payload: { paymentTerm: period } });
      step === 4 && dispatch({ type: CHANGE_STEP, payload: 5 });
    }

    setTimeout(() => scrollToBottom());
  };

  return (
    <div
      className={`${classes.card} ${matches && classes.xxscard}`}
      style={{
        background: isChecked ? theme.palette.secondary.light : "white",
        boxShadow: isChecked
          ? "-2px 2px 15px rgba(0,0,0,0.1)"
          : "-2px 2px 15px rgba(0,0,0,0.05)"
      }}
      onClick={handleRadioClick}
    >
      <div className={classes.header}>
        <Radio
          label="My checkbox"
          className={`${classes.radio} ${!isChecked && classes.uncheckedRadio}`}
          checked={isChecked}
        />

        <div className={classes.title}>
          <CardHeader>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </CardHeader>
        </div>
      </div>

      <div className={classes.description}>
        {/* {period === "four_week" ? (
          <div className={classes.crossed}>
            <strike>Extra €1 korting</strike>
          </div>
        ) : (
          <>
            <div>Extra €1 korting</div>
            <div>per 4 weken</div>
          </>
        )} */}
        {description && description.includes("per") && (
          <>
            <div>{description.split("per")[0]}</div>
            <div>{"per" + description.split("per")[1]}</div>
          </>
        )}
      </div>
    </div>
  );
};
