import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INPUT_DATA, CHANGE_STEP } from "../constants";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Radio } from "@material-ui/core";
import { PricePerPeriod, TickList } from ".";
import { CardHeader } from "../styles";

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 2,
    padding: "16px 23px 20px 43px",
    width: 355,
    height: 189,
    marginBottom: 20,
    cursor: "pointer",
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 10,
      width: "100%"
    }
  },
  wrapper: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-around",
    position: "relative",
    marginBottom: 25
  },
  title: {
    flexGrow: 1
  },
  radio: {
    position: "absolute",
    top: -9.5,
    left: -40,
    fontSize: 17,
    lineHeight: "16px",
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
    paddingLeft: 35,
    position: "relative"
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: 12.4,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13
    }
  },
  circle: {
    position: "absolute",
    left: -27,
    top: 3,
    minWidth: 48,
    height: 48,
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    color: "white",
    transform: "rotate(-8deg)",
    boxShadow: "0 2px 10px 0 rgba(70,135,116,0.3)",
    fontWeight: "bold"
  }
}));

export default ({ plan, period, scrollToBottom }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const step = useSelector(state => state.step);
  const data = useSelector(state => state.inputtedData);
  const isChecked = useSelector(state => state.inputtedData.period) === period;
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);
  const tickList = subscriptionOptions[plan].contract_periods
    .find(plan => plan.period === period)
    .payment_periods.find(plan => plan.period === period).promotion.lines;

  const renderTitle = () =>
    subscriptionOptions[data.plan].contract_periods.find(
      contract => contract.period === period
    ).title;

  const calculatePrice = () => {
    const planDataPerFourWeeks = subscriptionOptions[
      plan
    ].contract_periods.find(plan => plan.period === period).payment_periods[0];

    let price = planDataPerFourWeeks.original_price;

    data.plan === plan &&
      data.period === period &&
      data.price !== price &&
      dispatch({ type: INPUT_DATA, payload: { price: price } });

    return price;
  };

  const handleClick = () => {
    isChecked
      ? dispatch({ type: INPUT_DATA, payload: { period: null } })
      : dispatch({ type: INPUT_DATA, payload: { period } });

    isChecked
      ? dispatch({ type: INPUT_DATA, payload: { price: null } })
      : dispatch({ type: INPUT_DATA, payload: { price: calculatePrice() } });

    isChecked && step === 5 && dispatch({ type: CHANGE_STEP, payload: 4 });

    if (!isChecked && period === "four_week") {
      dispatch({ type: INPUT_DATA, payload: { paymentTerm: period } });
      (step === 3.5 || step === 4) &&
        dispatch({ type: CHANGE_STEP, payload: 5 });
    } else {
      dispatch({ type: INPUT_DATA, payload: { paymentTerm: null } });
      (step === 3.5 || step === 5) &&
        dispatch({ type: CHANGE_STEP, payload: 4 });
    }

    setTimeout(() => scrollToBottom());
  };

  return (
    <div
      className={classes.card}
      style={{
        background: isChecked ? theme.palette.secondary.light : "white"
      }}
      onClick={handleClick}
    >
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Radio
            label="My checkbox"
            className={`${classes.radio} ${!isChecked &&
              classes.uncheckedRadio}`}
            checked={isChecked}
          />
          <div className={classes.title}>
            <CardHeader>{renderTitle()}</CardHeader>
          </div>

          <PricePerPeriod price={calculatePrice()} period="per 4 weken" />
        </div>

        <div className={classes.description}>
          {tickList && Boolean(tickList.length) && (
            <div className={classes.circle}>actie</div>
          )}
          {/* <div className={classes.descriptionTitle}>Laatste week</div> */}
          <TickList termCard list={tickList} paddingLeft={28} />
        </div>
      </div>
    </div>
  );
};
