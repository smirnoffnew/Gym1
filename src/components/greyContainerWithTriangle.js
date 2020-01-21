import React from "react";
import { Container } from "../styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.primary.light,
    paddingBottom: 45,
    paddingLeft: 70,
    position: "relative",
    boxShadow: "inset 0px -3px #E0D9D7",
    borderRadius: "0 0 2px 2px",
    borderLeft: `2px solid rgba(243,240,239,0.5)`,
    [theme.breakpoints.down("sm")]: {
      padding: "40px 20px 20px 20px !important",
      height: "auto !important"
    }
  },
  svg: {
    position: "absolute",
    top: 0,
    [theme.breakpoints.down("sm")]: {
      top: -1,
      left: 71
    }
  },
  polyline: {
    strokeDasharray: 100,
    strokeDashoffset: 100,
    fill: "white",
    stroke: "rgba(255, 255, 255, 0.5)",
    strokeWidth: 2
  }
}));

export default ({
  children,
  paddingRight = 30,
  paddingTop = 40,
  height = "auto"
}) => {
  const classes = useStyles();

  return (
    <Container
      className={classes.container}
      bottomgutter
      style={{
        paddingRight,
        paddingTop,
        height
      }}
    >
      <svg height="20" width="40" className={classes.svg}>
        <polyline points="0,0 20,20 40,0" className={classes.polyline} />
      </svg>
      {children}
    </Container>
  );
};
