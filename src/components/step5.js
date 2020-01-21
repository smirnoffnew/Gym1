import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { QuestionLine, BlockHeader, Number, PulseNumber } from "../styles";
import { RegistrationFrom } from ".";

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: "0 0 85px 70px",
    [theme.breakpoints.down("sm")]: {
      padding: "1px 20px 100px 20px"
    }
  },
  header: {
    paddingBottom: 21,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 19
    }
  },
  number: {
    color: theme.palette.primary.main
  },
  description: {
    paddingBottom: 31,
    "&>a": {
      textDecoration: "underline",
      fontWeight: "bold !important",
      color: "#000000"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      lineHeight: "20px",
      paddingBottom: 37,
      "&>a": {
        fontWeight: "400 !important"
      }
    }
  }
}));

export default () => {
  const classes = useStyles();
  const step = useSelector(state => state.step);
  const data = useSelector(state => state.inputtedData);

  return (
    step > 3 &&
    step < 6 &&
    data.plan &&
    data.paymentTerm && (
      <div className={classes.wrapper}>
        <QuestionLine className={classes.header}>
          {step === 5 ? (
            <PulseNumber>
              <span>5</span>
            </PulseNumber>
          ) : (
            <Number className={classes.number}>
              <span>5</span>
            </Number>
          )}
          <BlockHeader>Registreren</BlockHeader>
        </QuestionLine>
        <div className={classes.description}>
          Je persoonsgegevens zullen door Fit For Free worden verwerkt in
          overeenstemming met haar&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.fitforfree.nl/privacybeleid"
          >
            privacybeleid
          </a>
          .
        </div>
        <RegistrationFrom />
      </div>
    )
  );
};
