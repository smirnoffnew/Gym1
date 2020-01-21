import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  BASE_URL,
  API_KEY,
  COUNTRY_CODE,
  CHANGE_STEP,
  RESET_DATA,
  INPUT_DATA
} from "../constants";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Select } from "@material-ui/core";
import {
  Title,
  Container,
  QuestionLine,
  Line,
  Number,
  PulseNumber,
  BlockHeader
} from "../styles";

const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: 32,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 34
    }
  },
  description: {
    padding: 0,
    letterSpacing: "-1px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 17,
      lineHeight: "23px"
    }
  },
  selectWrapper: {
    width: "100%",
    padding: 0
  },
  select: {
    height: 50,
    borderRadius: 2,
    boxShadow: "-2px 2px 15px 0 rgba(0,0,0,0.05), #F3F0EF 0px -3px inset",
    "& select": {
      fontSize: 13,
      lineHeight: "17px",
      [theme.breakpoints.down("sm")]: {
        lineHeight: "16px"
      }
    }
  },
  arrowIcon: {
    top: "calc(50% - 5px) !important",
    "&>path": {
      d: "path('m 0 0 l 6.3 7 l 6.3 -7') !important",
      stroke: "#99877C !important",
      fill: "white !important",
      strokeWidth: "2px !important",
      strokeLinejoin: "round"
    }
  }
}));

export default () => {
  const [venues, setVenues] = useState([]);
  const step = useSelector(state => state.step);
  const data = useSelector(state => state.inputtedData);
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const step1Select = React.createRef();
  const inputProps = {
    ref: step1Select
  };

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/v1/venue/getvenuesbycountrycode?key=${API_KEY}&countrycode=${COUNTRY_CODE}`
      )
      .then(({ data }) => {
        setVenues(data.data);
      })
      .catch(error => {
        console.dir(error);
      });
  }, [venues.length]);

  const handleSelectChange = name => {
    const id = venues.find(venue => venue.name === name).venueid;
    step1Select.current.blur();

    dispatch({ type: RESET_DATA });
    dispatch({
      type: INPUT_DATA,
      payload: {
        venue: {
          id,
          name
        }
      }
    });
    dispatch({ type: CHANGE_STEP, payload: 2 });
  };

  return (
    step < 6 && (
      <>
        <Title>
          <h1>Wij helpen je graag!</h1>
          <Line className={classes.description}>
            <span>
              Aan de hand van deze vragen en stappen stellen wij voor jou het
              perfecte abonnement samen.
            </span>
          </Line>
        </Title>

        <Container
          paddingBottom={75}
          bottomgutter={1}
          color={theme.palette.secondary.main}
          active={+step === 1}
        >
          <QuestionLine className={classes.header}>
            {step === 1 ? (
              <PulseNumber>
                <span>1</span>
              </PulseNumber>
            ) : (
              <Number>
                <span>1</span>
              </Number>
            )}
            <BlockHeader>Waar wil je sporten?</BlockHeader>
          </QuestionLine>
          <Line className={classes.selectWrapper}>
            {venues.length > 0 && (
              <Select
                native
                className={`${classes.select} step1__select`}
                value={data.venue.name}
                onChange={e => handleSelectChange(e.target.value)}
                inputProps={{
                  ...inputProps,
                  classes: {
                    icon: classes.arrowIcon
                  }
                }}
              >
                <option value="" disabled>
                  Maak je keuze
                </option>
                {venues.map(venue => (
                  <option value={venue.name} key={venue.venueid}>
                    {venue.name}
                  </option>
                ))}
              </Select>
            )}
          </Line>
        </Container>
      </>
    )
  );
};
