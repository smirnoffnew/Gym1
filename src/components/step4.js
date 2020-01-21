import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import {
  Container,
  QuestionLine,
  Line,
  Number,
  PulseNumber,
  BlockHeader
} from "../styles";
import { TermCard, GreyContainerWithTriangle, PaymentPeriodCard } from "./";

const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: 33,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 34
    }
  },
  termCardWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 19,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0,
      "&>div:last-child": {
        marginBottom: 0
      }
    }
  },
  paymentPeriodHeader: {
    paddingBottom: 30,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 10
    }
  },
  paymentPeriodCardWrapper: {
    width: "100%",
    paddingBottom: 12,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      paddingBottom: 0
    }
  }
}));

export default ({ scrollToBottom }) => {
  const classes = useStyles();
  const theme = useTheme();
  const step = useSelector(state => state.step);
  const data = useSelector(state => state.inputtedData);
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);

  return (
    step > 3 &&
    step < 6 &&
    data.plan && (
      <Slide
        direction="up"
        in={step > 3}
        onEnter={data.plan && step === 4 ? scrollToBottom : () => {}}
      >
        <div>
          <Container
            color={theme.palette.secondary.main}
            paddingRight={70}
            active={+step === 4}
            bottomgutter={!data.period}
          >
            <QuestionLine className={classes.header}>
              {step === 4 ? (
                <PulseNumber>
                  <span>4</span>
                </PulseNumber>
              ) : (
                <Number>
                  <span>4</span>
                </Number>
              )}
              <BlockHeader>Welke looptijd past bij jou?</BlockHeader>
            </QuestionLine>
            <Line className={classes.termCardWrapper}>
              {data.plan &&
                subscriptionOptions &&
                subscriptionOptions[data.plan] &&
                subscriptionOptions[data.plan].contract_periods.map(plan => (
                  <TermCard
                    key={Math.random()}
                    plan={data.plan}
                    period={plan.period}
                    scrollToBottom={scrollToBottom}
                  />
                ))}
            </Line>
          </Container>
          {data.period && (
            <GreyContainerWithTriangle paddingTop={42} height={270}>
              <QuestionLine className={classes.paymentPeriodHeader}>
                <BlockHeader noMargin>Kies je betalingstermijn</BlockHeader>
              </QuestionLine>
              <Line className={classes.paymentPeriodCardWrapper}>
                {data.plan &&
                  subscriptionOptions &&
                  subscriptionOptions[data.plan] &&
                  subscriptionOptions[data.plan].contract_periods
                    .find(plan => plan.period === data.period)
                    .payment_periods.slice()
                    .reverse()
                    .map(paymentPeriod => (
                      <PaymentPeriodCard
                        title={paymentPeriod.title}
                        period={paymentPeriod.period}
                        scrollToBottom={scrollToBottom}
                        description={paymentPeriod.description}
                        key={paymentPeriod.period}
                      />
                    ))}
              </Line>
            </GreyContainerWithTriangle>
          )}
        </div>
      </Slide>
    )
  );
};
