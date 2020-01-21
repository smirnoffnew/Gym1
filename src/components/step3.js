import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { INPUT_DATA, INPUT_EXTRA, CHANGE_STEP } from "../constants";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import {
  Container,
  QuestionLine,
  Line,
  Number,
  PulseNumber,
  BlockHeader,
  StyledButton
} from "../styles";
import { GreyContainerWithTriangle, ExtraOptionCard } from "./";

const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: 33,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 34
    }
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 14,
    marginBottom: 1,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
      marginBottom: 0
    }
  },
  description: {
    lineHeight: "24px",
    paddingBottom: 22,
    [theme.breakpoints.down("sm")]: {
      fontSize: 17,
      paddingTop: 0,
      lineHeight: "23px",
      paddingBottom: 10
    }
  },
  optionsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  buttonWrapper: {
    width: "100%",
    padding: 0,
    "&>button:first-child": {
      marginRight: 10
    },
    [theme.breakpoints.down("sm")]: {
      "&>button:first-child": {
        marginRight: 16
      }
    }
  },
  addonButton: {
    background: "white",
    textTransform: "none",
    marginRight: 20,
    padding: "15px 15px 15px 30px",
    width: 210,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between"
  },
  addonButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    width: 80,
    lineHeight: "normal",
    textAlign: "left"
  }
}));

export default ({ scrollToBottom, scrollOutStep2, scrollToFormTop }) => {
  const classes = useStyles();
  const theme = useTheme();
  const step = useSelector(state => state.step);
  const data = useSelector(state => state.inputtedData);
  const options = useSelector(state => state.subscriptionOptions);
  const extraOptions = useSelector(state => state.inputtedData.extra);
  const isExtraIncluded = useSelector(
    state => state.inputtedData.isExtraIncluded
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (step > 2 && step < 4 && data.period === null) {
      if (isExtraIncluded) {
        setTimeout(() => scrollOutStep2 && scrollOutStep2());
      }
      if (isExtraIncluded === false) {
        data.paymentTerm === null
          ? setTimeout(() => scrollToBottom && scrollToBottom())
          : setTimeout(() => scrollToFormTop && scrollToFormTop());
      }
    }
  }, [
    data.paymentTerm,
    data.period,
    isExtraIncluded,
    scrollOutStep2,
    scrollToBottom,
    scrollToFormTop,
    step
  ]);

  const handleButtonClick = isExtraIncluded => {
    dispatch({ type: INPUT_DATA, payload: { isExtraIncluded } });

    dispatch({
      type: CHANGE_STEP,
      payload: isExtraIncluded ? 3.5 : data.paymentTerm === null ? 4 : 5
    });

    for (let option in extraOptions) {
      dispatch({ type: INPUT_EXTRA, payload: { [option]: false } });
    }
  };

  const renderExtra = () => {
    return [
      ...options[data.plan].contract_periods[0].payment_periods[0].addons,
      ...options[data.plan].contract_periods[0].payment_periods[0]
        .expendable_options
    ];
  };

  return (
    step > 1 &&
    step < 6 &&
    data.plan && (
      <Slide direction="up" in={step > 1 && step < 6 && Boolean(data.plan)}>
        <div>
          <Container
            paddingBottom={64}
            bottomgutter={!isExtraIncluded}
            color={theme.palette.secondary.main}
            active={+(step === 3 || step === 3.5)}
          >
            <QuestionLine className={classes.header}>
              {step === 3 || step === 3.5 ? (
                <PulseNumber>
                  <span>3</span>
                </PulseNumber>
              ) : (
                <Number>
                  <span>3</span>
                </Number>
              )}
              <BlockHeader>Meer uit dit abonnement halen?</BlockHeader>
            </QuestionLine>
            <Line className={classes.buttonWrapper}>
              <StyledButton
                opted={+!!isExtraIncluded}
                variant="contained"
                colour={theme.palette.secondary.main}
                onClick={() => handleButtonClick(true)}
              >
                Ja
              </StyledButton>
              <StyledButton
                opted={+(isExtraIncluded === false)}
                variant="contained"
                colour={theme.palette.secondary.main}
                onClick={() => handleButtonClick(false)}
              >
                Nee
              </StyledButton>
            </Line>
          </Container>

          {isExtraIncluded && (
            <GreyContainerWithTriangle paddingRight={70}>
              <div className={classes.wrapper}>
                <span className={classes.description}>
                  Met deze aanvullingen weet jij zeker dat je het maximale uit
                  jouw training haalt.
                </span>
                <div className={classes.optionsWrapper}>
                  {renderExtra().map(option => (
                    <ExtraOptionCard
                      title={option.title}
                      description={option.description}
                      price={option.original_price}
                      period={option.addon ? "per 4 weken" : "eenmalig"}
                      option={
                        option.addon ? option.addon : "introduction_lesson"
                      }
                      scrollToBottom={scrollToBottom}
                      scrollToFormTop={scrollToFormTop}
                      key={Math.random()}
                    />
                  ))}
                </div>
              </div>
            </GreyContainerWithTriangle>
          )}
        </div>
      </Slide>
    )
  );
};
