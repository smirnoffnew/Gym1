import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  wrapper: {},
  list: {
    listStyleType: "none",
    margin: 0
  },
  item: {
    display: "flex",
    alignItems: "baseline",
    position: "relative",
    margin: 0,
    fontSize: 15,
    lineHeight: "24px",
    [theme.breakpoints.down("sm")]: {
      height: "auto !important",
      fontSize: 13,
      lineHeight: "20px"
    }
  },
  xsItem: {
    wordBreak: "break-all"
  },
  icon: {
    position: "absolute",
    top: -1,
    left: -32,
    [theme.breakpoints.down("sm")]: {
      left: -34
    }
  }
}));

export default ({
  list = null,
  paddingLeft = 0,
  height = 24,
  paddingTop = 0,
  termCard = false
}) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width: 294.95px)");

  const renderList = () => {
    if (!list) return null;
    return termCard ? (
      <>
        {list.map(item => (
          <li className={classes.item} key={Math.random()} style={{ height }}>
            <CheckIcon color="secondary" className={classes.icon}>
              check
            </CheckIcon>
            {item}
          </li>
        ))}
      </>
    ) : (
      <>
        {list
          .filter(item => item.in_subscription)
          .map(item => (
            <li
              className={`${classes.item} ${matches ? classes.xsItem : ""}`}
              key={Math.random()}
              style={{ height }}
            >
              <CheckIcon color="secondary" className={classes.icon}>
                check
              </CheckIcon>
              {item.short_description}
            </li>
          ))}
      </>
    );
  };

  return (
    <div style={{ paddingTop }} className={classes.wrapper}>
      <ul className={classes.list} style={{ paddingLeft }}>
        {renderList()}
      </ul>
    </div>
  );
};
