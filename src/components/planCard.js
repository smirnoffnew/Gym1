import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { PricePerPeriod, TickList } from ".";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 355,
    width: 355,
    maxWidth: 500,
    minHeight: 189,
    height: 300,
    maxHeight: "100%",
    marginLeft: 10,
    borderRadius: 2,
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.1)",
    padding: "16px 23px 30px 43px",
    display: "flex",
    flexDirection: "column",
    cursor: "default",
    background: theme.palette.secondary.light,
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 15px 20px 43px",
      maxWidth: 305,
      width: "auto",
      minWidth: "100%",
      height: "auto",
      minHeight: 148,
      marginLeft: 0
    }
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 39,
    flexWrap: "wrap",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      alignItems: "baseline",
      marginBottom: 26,
      "&>div:last-child": {
        paddingTop: 2
      }
    }
  },
  title: {
    flexGrow: 1,
    padding: "4px 10px 0 0",
    fontSize: 24,
    lineHeight: "22px",
    letterSpacing: -1,
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 17,
      lineHeight: "16px",
      letterSpacing: -1,
      padding: "0 10px 0 0"
    }
  }
}));

export default ({ plan }) => {
  const classes = useStyles();
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);

  const price =
    subscriptionOptions && subscriptionOptions[plan]
      ? subscriptionOptions[plan].contract_periods[1].shortest_period_price
      : "";
  const matchesTickList = useMediaQuery("(min-width:960px)");

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes.title}>{subscriptionOptions[plan].name}</div>
        <PricePerPeriod price={price} period="per 4 weken" />
      </div>
      {subscriptionOptions[plan].descriptionLines &&
        subscriptionOptions[plan].descriptionLines &&
        subscriptionOptions[plan].descriptionLines.lines && (
          <TickList
            paddingTop={0}
            list={subscriptionOptions[plan].descriptionLines.lines}
            paddingLeft={matchesTickList ? 28 : 30}
            height={22}
          />
        )}
    </div>
  );
};
