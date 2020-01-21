import React from "react";
import { useSelector } from "react-redux";
import { Step1, Step2, Step3, Step4, Step5, Overview, Sidebar } from "./";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse"
    }
  },
  column9: {
    width: 870,
    minWidth: 870,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },
  column3: {
    width: 300,
    minWidth: 300,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },
  column12: {
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  wide: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));

export default () => {
  const classes = useStyles();
  const bottom = React.createRef();
  const formTop = React.createRef();
  const step1Bottom = React.createRef();
  const step2Bottom = React.createRef();
  const matches = useMediaQuery("(min-width: 960px)");
  const data = useSelector(state => state.inputtedData);

  const scrollToBottom = () => {
    bottom &&
      bottom.current &&
      bottom.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollOutStep1 = () => {
    step1Bottom &&
      step1Bottom.current &&
      step1Bottom.current.scrollIntoView({
        alignTo: "start",
        behavior: "smooth",
        block: "start"
      });
  };

  const scrollOutStep2 = () => {
    step2Bottom &&
      step2Bottom.current &&
      step2Bottom.current.scrollIntoView({
        alignTo: "start",
        behavior: "smooth",
        block: "start"
      });
  };

  const scrollToFormTop = () => {
    formTop &&
      formTop.current &&
      formTop.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Container
        maxWidth="lg"
        className={`${classes.container} ${data.removeSidePaddings &&
          classes.wide}`}
      >
        <div className={classes.column9}>
          {!matches && <Sidebar />}
          <Step1 />
          <div ref={step1Bottom} />
          <Step2
            scrollToBottom={scrollToBottom}
            scrollOutStep1={scrollOutStep1}
          />
          <div ref={step2Bottom} />
          <Step3
            scrollToBottom={scrollToBottom}
            scrollOutStep2={scrollOutStep2}
            scrollToFormTop={scrollToFormTop}
          />
          <Step4 scrollToBottom={scrollToFormTop} />
          <div ref={formTop} />
          <Step5 />
        </div>
        {matches && (
          <div className={classes.column3}>
            <Sidebar />
          </div>
        )}
      </Container>
      <Container maxWidth="lg" className={classes.column12}>
        <Grid container direction="row">
          <Overview
            scrollOutStep1={scrollOutStep1}
            scrollToFormTop={scrollToFormTop}
          />
        </Grid>
      </Container>
      <div ref={bottom} />
    </>
  );
};
