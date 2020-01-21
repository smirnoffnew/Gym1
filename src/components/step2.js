import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  INPUT_DATA,
  INPUT_EXTRA,
  REMOVE_AN_EXTRA,
  GET_SUBSCRIPTION_OPTIONS,
  BASE_URL,
  API_KEY,
  GENERAL_SALT,
  CHANGE_STEP,
  step2OptionsArray
} from "../constants";
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
import { GreyContainerWithTriangle, PlanCard, Step2Option } from "./";
import { isMatch, isEqual, chunk } from "lodash";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: 2,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 1.63,
      alignItems: "flex-start",
      maxWidth: 240,
      "&>div:last-child": {
        fontSize: 21,
        lineHeight: "26px",
        letterSpacing: -1
      }
    }
  },
  upperWrapper: {
    "&>div:nth-child(2)": {
      fontSize: 15,
      lineHeight: "24px",
      paddingLeft: 40,
      paddingBottom: 22
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      "&>div:nth-child(2)": {
        fontSize: 13,
        lineHeight: "20px",
        paddingBottom: 30,
        paddingLeft: 40
      }
    }
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    "&>span": {
      fontFamily: "DINOT-Bold",
      fontSize: 30,
      lineHeight: "26px",
      letterSpacing: -1,
      paddingBottom: 58
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingTop: 4,
      paddingBottom: 35,
      "&>span": {
        fontSize: 21,
        lineHeight: "26px",
        letterSpacing: -1,
        paddingBottom: 34
      }
    }
  },
  columnWrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 25
    }
  },
  flexGrowWrapper: {
    flexGrow: 1,
    paddingBottom: 24
  },
  subheaderWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingRight: 20,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0
    }
  },
  buttonWrapper: {
    width: "65%",
    paddingBottom: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around"
    }
  },
  smallButtonWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    "&>div": {
      width: "100%",
      display: "flex",
      justifyContent: "space-around"
    }
  },
  title: {
    paddingLeft: 0,
    paddingRight: 10
  },
  error: {
    color: "red",
    marginLeft: 70,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 20
    }
  }
}));

export default ({ scrollToBottom, scrollOutStep1 }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const step = useSelector(state => state.step);
  const step2options = useSelector(state => state.step2options);
  const data = useSelector(state => state.inputtedData);
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);
  const upperMatches = useMediaQuery("(max-width: 950px)");
  const lowerMatches = useMediaQuery("(min-width: 650px)");

  useEffect(() => {
    if (data.venue && data.venue.id) {
      function sha512(str) {
        return crypto.subtle
          .digest("SHA-512", new TextEncoder("utf-8").encode(str))
          .then(buf => {
            return Array.prototype.map
              .call(new Uint8Array(buf), x => ("00" + x.toString(16)).slice(-2))
              .join("");
          });
      }
      const stringForHash = `${data.venue.id}0${GENERAL_SALT}`;
      sha512(stringForHash).then(hash => {
        axios
          .get(
            `${BASE_URL}/v2/subscription/getSignupOptions?key=${API_KEY}&venueid=${data.venue.id}&saletype=private&timestamp=0&hash=${hash}`
          )
          .then(({ data }) => {
            let subscriptionOptions = {};
            if (
              data.data.subscription_options[0].contract_periods[0]
                .payment_periods[0].original_price
            ) {
              data.data.subscription_options.forEach(option => {
                subscriptionOptions[option.membership_type] = option;
              });

              dispatch({
                type: GET_SUBSCRIPTION_OPTIONS,
                payload: subscriptionOptions
              });

              dispatch({
                type: INPUT_DATA,
                payload: {
                  dataError: false
                }
              });
            } else {
              dispatch({
                type: INPUT_DATA,
                payload: {
                  dataError: true
                }
              });
            }
          })
          .catch(error => {
            console.dir(error);
          });
      });
    }
  }, [data.venue, dispatch]);

  useEffect(() => {
    const options = {};
    Object.keys(step2options).forEach(item => {
      options[step2options[item].name] = step2options[item].state;
    });

    for (let item of step2OptionsArray) {
      if (isMatch(options, item.options)) {
        if (item.plan === null && !isEqual(data.extra, {})) {
          dispatch({
            type: INPUT_DATA,
            payload: { extra: {} }
          });
        }

        if (data.plan !== item.plan) {
          dispatch({ type: INPUT_DATA, payload: { plan: item.plan } });

          const newExtra =
            item.plan && subscriptionOptions
              ? [
                  ...subscriptionOptions[item.plan].contract_periods[0]
                    .payment_periods[0].addons,
                  ...subscriptionOptions[item.plan].contract_periods[0]
                    .payment_periods[0].expendable_options
                ]
                  .map(item =>
                    item.option ? item.option : item.addon ? item.addon : null
                  )
                  .filter(item => item !== null)
              : null;

          if (newExtra) {
            Object.keys(data.extra).forEach(
              item =>
                !newExtra.includes(item) &&
                dispatch({
                  type: REMOVE_AN_EXTRA,
                  payload: item
                })
            );

            newExtra.forEach(
              item =>
                !Object.keys(data.extra).includes(item) &&
                dispatch({
                  type: INPUT_EXTRA,
                  payload: {
                    [item]: false
                  }
                })
            );
          }

          dispatch({ type: INPUT_DATA, payload: { plan: item.plan } });
        }

        setTimeout(() => {
          data.plan &&
            data.isExtraIncluded === null &&
            scrollOutStep1 &&
            scrollOutStep1();
        });

        data.venue.id &&
          item.plan === null &&
          dispatch({ type: CHANGE_STEP, payload: 2 });
        break;
      }
    }
  }, [
    data.venue,
    data.vernue,
    data.venue.id,
    dispatch,
    step2options,
    data.plan,
    scrollOutStep1,
    data.extra,
    subscriptionOptions,
    data.isExtraIncluded
  ]);

  const renderOptions = () => {
    const titles = {
      fitness: "Fitness",
      pause: "Pauzeren",
      friend: "Bring a friend",
      group: "Live groepslessen",
      share: "Share a pass"
    };

    const options = Object.keys(step2options)
      .sort()
      .map(item => {
        let title = titles[step2options[item].name];
        return (
          <Step2Option
            title={title}
            id={item}
            option={step2options[item].name}
            checked={step2options[item].state}
            key={item}
          />
        );
      });

    options.splice(
      1,
      0,
      <Step2Option
        title={"Digital coach"}
        option={data.digitalCoach}
        checked={data.digitalCoach}
        key={data.digitalCoach}
        onClick={() => {
          dispatch({
            type: INPUT_DATA,
            payload: { digitalCoach: !data.digitalCoach }
          });
          scrollOutStep1();
        }}
      />
    );

    return {
      full: options,
      upper: chunk(options, 3)[0],
      lower: chunk(options, 3)[1]
    };
  };

  return data.dataError === null
    ? null
    : step > 1 &&
        step < 6 &&
        (data.dataError ? (
          <div className={classes.error}>
            No needed data on this venue. Please choose a different one.{" "}
          </div>
        ) : (
          <Slide
            direction="up"
            in={step > 1}
            onEnter={step === 2 ? scrollToBottom : () => {}}
          >
            <div>
              <Container
                paddingBottom={46}
                className={classes.upperWrapper}
                color={theme.palette.secondary.main}
                active={+(step === 2 || step === 2.5)}
                bottomgutter={+!data.plan}
              >
                <QuestionLine className={classes.header}>
                  {step === 2 || step === 2.5 ? (
                    <PulseNumber>
                      <span>2</span>
                    </PulseNumber>
                  ) : (
                    <Number>
                      <span>2</span>
                    </Number>
                  )}
                  <BlockHeader>Wat wil je in je abonnement?</BlockHeader>
                </QuestionLine>

                <div>meerdere opties mogelijk*</div>

                {upperMatches && lowerMatches ? (
                  <div className={classes.smallButtonWrapper}>
                    <div>{step2options && renderOptions().upper}</div>
                    <div>{step2options && renderOptions().lower}</div>
                  </div>
                ) : (
                  <Line className={classes.buttonWrapper}>
                    {step2options && renderOptions().full}
                  </Line>
                )}
              </Container>
              {data.plan && (
                <GreyContainerWithTriangle paddingTop={38}>
                  <div className={classes.wrapper}>
                    <span>Wij adviseren dit abonnement:</span>
                    <PlanCard plan={data.plan} />
                  </div>
                </GreyContainerWithTriangle>
              )}
            </div>
          </Slide>
        ));
};
