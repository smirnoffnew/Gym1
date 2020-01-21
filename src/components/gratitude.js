import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RESET_DATA, RESET_STEPPER } from "../constants";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Title, Line, Number, PulseNumber, StyledButton } from "../styles";
import CircleBackground from "../images/a_guy_lifts_2_girls.gif";
import IdealLogo from "../images/Ideal_logo_2x.png";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: 15,
    paddingRight: 15,
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  column8: {
    width: 800,
    minWidth: 800,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%",
      padding: "0 15px"
    }
  },
  column4: {
    width: 370,
    minWidth: 370,
    position: "relative",
    paddingTop: 39.5,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%",
      paddingTop: 74.5,
      paddingBottom: 28.5,
      display: "flex",
      justifyContent: "center"
    }
  },
  column12: {
    width: 1173,
    minWidth: 1173,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "100%"
    }
  },

  title: {
    marginTop: 100,
    marginBottom: 100,
    "&>div": {
      fontFamily: "Stencil Std",
      fontWeight: "normal",
      fontSize: 44,
      lineHeight: 1,
      textTransform: "uppercase",
      marginBottom: 12,
      letterSpacing: -1
    },
    [theme.breakpoints.down("sm")]: {
      margin: "25px 20px 0px 22px",
      "&>div": {
        width: "100%",
        fontSize: 25,
        lineHeight: "31px",
        letterSpacing: -0.57
      },
      "&>span": {
        fontSize: 17,
        lineHeight: "23px",
        letterSpacing: -1,
        paddingTop: 13
      }
    }
  },

  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  iconContainer: {
    height: 363,
    width: 365,
    background: "white",
    borderRadius: "50%",
    backgroundImage: `url(${CircleBackground})`,
    backgroundSize: "120%",
    backgroundPosition: "center",
    border: "5px solid white",
    boxShadow: "-2px 2px 15px 0 rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      width: 200,
      height: 199
    }
  },
  card: {
    display: "flex",

    "&>div": {
      display: "flex",
      alignItems: "center",
      marginBottom: "0",
      paddingBottom: "0"
    }
  },
  header: {
    display: "flex"
  },
  stepHeader: {
    paddingLeft: 15,
    margin: 0,
    paddingBottom: 0,
    fontSize: 30,
    lineHeight: "26px",
    fontFamily: "DINOT-Bold",
    letterSpacing: -1,
    [theme.breakpoints.down("sm")]: {
      fontFamily: "DINOT-Bold",
      fontSize: 21,
      lineHeight: "30px",
      letterSpacing: -1
    }
  },
  nextStep: {
    marginTop: 8,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0
    }
  },
  step2header: {
    display: "flex",

    "&>div:last-child": {
      width: 30,
      height: 29,
      marginLeft: 19,
      backgroundImage: `url(${IdealLogo})`,
      backgroundSize: "100%",
      backgroundPosition: "bottom"
    }
  },
  upperCard: {
    padding: "60px 100px 72px 70px",
    flexDirection: "column",
    marginRight: 135,
    width: 670,
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.05)",
    background: "#FFFFFF",
    borderRadius: "2px 2px 0 0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginRight: 0,
      padding: "20px 0px 0px 20px"
    }
  },
  lowerCard: {
    width: "100%",
    marginTop: 402,
    paddingTop: 57,
    padding: "60px 70px",
    justifyContent: "space-between",

    "&>div:first-child": {
      fontSize: 13,
      lineHeight: "20px",
      width: 410,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      "&>p:first-child": {
        marginTop: 0
      },
      "&>p:last-child": {
        marginBottom: 0
      }
    },

    "&>div:last-child": {
      display: "flex",
      alignItems: "flex-start",
      "&>a": {
        textDecoration: "none",
        marginTop: 40,
        [theme.breakpoints.down("sm")]: {
          marginTop: 0,
          width: "100% !important",
          maxWidth: "345px !important"
        }
      },
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center"
      }
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: 30,
      padding: "19px 15px",
      flexDirection: "column",

      "&>div:first-child": {
        width: "auto",
        "&>p": {
          marginTop: 0,
          marginBottom: 0,
          paddingRight: 10,
          paddingBottom: 20,
          "&>span": {
            fontFamily: "DINOT-Bold"
          }
        }
      },

      "&>div:last-child": {
        height: 60,
        width: "100%",
        "&>a": {
          width: "100%",
          height: 60
        }
      }
    }
  },
  stepDone: {
    background: theme.palette.secondary.main,
    color: "white",
    boxShadow: "0 2px 8px 0 rgba(153,135,124,0.23) !important",
    [theme.breakpoints.down("sm")]: {
      background: "#99877C",
      boxShadow: "0 2px 8px 0 rgba(153,135,124,0.23) !important",
      fontWeight: "bold",
      fontSize: 17,
      lineHeight: "16px",
      letterSpacing: 1
    }
  },
  stepActive: {
    [theme.breakpoints.down("sm")]: {
      background: "#FF001B",
      fontWeight: "bold",
      fontSize: 17,
      letterSpacing: 1
    }
  },
  stepNext: {
    background: "white",
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
    [theme.breakpoints.down("sm")]: {
      boxSizing: "border-box",
      height: 31,
      width: 31,
      border: "1px solid #99877C",
      boxShadow: "0 2px 8px 0 rgba(153, 135, 124, 0.22)",
      color: "#99877C"
    }
  },
  description: {
    margin: "10px 0px 10px 14.5px",
    paddingLeft: 30,
    borderWidth: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      lineHeight: "20px",
      padding: "0 30px",
      paddingRight: 30
    }
  },
  description1: {
    borderLeft: "1px solid #99877C",
    minHeight: 67,
    [theme.breakpoints.down("sm")]: {
      margin: "8px 0px 15.5px 14px !important",
      minHeight: 64
    }
  },
  description2: {
    borderLeft: "1px dotted brown",
    minHeight: 67,
    [theme.breakpoints.down("sm")]: {
      margin: "20px 0px 11.5px 14px !important",
      minHeight: 64,
      position: "relative",
      "&>div": {
        position: "absolute",
        top: -13.5
      }
    }
  },
  description3: {
    borderLeft: "1px solid white",
    [theme.breakpoints.down("sm")]: {
      marginTop: 8,
      minHeight: 81
    }
  },
  button: {
    minWidth: "230px !important",
    height: "60px !important",
    fontSize: "17px !important",
    fontFamily: "DINOT-Bold",
    lineHeight: "19px !important",
    letterSpacing: "-0.81px !important",
    textDecoration: "none",
    boxShadow: "0 2px 10px 0 rgba(70,135,116,0.3) !important",
    [theme.breakpoints.down("sm")]: {
      height: "60px !important",
      width: "100% !important",
      maxWidth: "345px !important",
      minHeight: "60px !important",
      fontSize: 21
    }
  }
}));

export default ({ step }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width: 960px)");

  const data = useSelector(state => state.inputtedData);
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);
  const termPeriodPlan = data.plan
    ? subscriptionOptions[data.plan].contract_periods
        .find(item => item.period === data.period)
        .payment_periods.find(item => item.period === data.paymentTerm)
    : null;

  useEffect(() => {
    setTimeout(() =>
      window.scrollTo({
        top: 0,
        left: 1,
        behavior: "smooth"
      })
    );

    if (termPeriodPlan) {
      const getAddonsData = () => {
        const chosenAddons = [];
        if (!termPeriodPlan.addons) {
          return null;
        }
        termPeriodPlan.addons.forEach(addon =>
          Object.keys(data.extra).forEach(
            extra =>
              data.extra[extra] &&
              extra === addon.addon &&
              chosenAddons.push(addon)
          )
        );
        return chosenAddons;
      };

      const getAddonsFirstPayment = () => {
        let firstPaymentSum = 0;
        termPeriodPlan.addons.forEach(addon =>
          Object.keys(data.extra).forEach(extra => {
            if (data.extra[extra] && extra === addon.addon) {
              firstPaymentSum += !!(
                addon.promotion &&
                typeof addon.promotion.discount_price === "number"
              )
                ? addon.promotion.discount_price
                : addon.price_per_four_week;
            }
          })
        );
        return firstPaymentSum;
      };

      const getOnetimeTotal = () => {
        const component1 = termPeriodPlan.original_joining_fee
          ? termPeriodPlan.original_joining_fee
          : 0;
        const component2 =
          termPeriodPlan.expendable_options &&
          termPeriodPlan.expendable_options[0] &&
          termPeriodPlan.expendable_options[0].original_price &&
          data.extra[
            Object.keys(data.extra).find(
              extra => extra === "introduction_lesson"
            )
          ]
            ? termPeriodPlan.expendable_options[0].original_price
            : 0;
        const deducted =
          termPeriodPlan.promotion &&
          termPeriodPlan.promotion.joining_fee_discount
            ? termPeriodPlan.promotion.joining_fee_discount
            : 0;
        const sum = component1 + component2 - deducted;
        return sum < 0 ? 0 : sum;
      };

      const renderContractTitle = () =>
        subscriptionOptions[data.plan].contract_periods.find(
          item => item.period === data.period
        ).title;

      const getTotalFirstPayment = () => {
        const total =
          termPeriodPlan.corrected_price +
          getAddonsFirstPayment() +
          getOnetimeTotal() -
          termPeriodPlan.promotion.discount;
        return total > 0 ? total : 1;
      };

      const sendGAdata = () => {
        const ecommerce = {
          purchase: {
            actionField: {
              id: `FFF${String(Math.random()).slice(2)}`,
              affiliation: data.venue.name,
              revenue: getTotalFirstPayment() / 100,
              quantity: 1
            },
            products: [
              {
                name: `${
                  subscriptionOptions[data.plan].name
                } ${renderContractTitle()} - ${termPeriodPlan.title}`,
                id: data.plan,
                category: "Subscription",
                brand: data.venue.name,
                price: termPeriodPlan.price_per_four_week / 100,
                quantity: 1
              }
            ]
          }
        };

        getAddonsData().forEach(addon => {
          ecommerce.purchase.products.push({
            name: addon.title,
            id: addon.addon,
            category: "addons",
            brand: data.venue.name,
            price: addon.price_per_four_week / 100,
            quantity: 1
          });
        });

        !!termPeriodPlan.expendable_options &&
          !!termPeriodPlan.expendable_options.length &&
          data.extra[
            Object.keys(data.extra).find(
              extra => extra === termPeriodPlan.expendable_options[0].option
            )
          ] &&
          ecommerce.purchase.products.push({
            name: termPeriodPlan.expendable_options[0].title,
            id: termPeriodPlan.expendable_options[0].option,
            category: "expendable_options",
            brand: data.venue.name,
            price: termPeriodPlan.expendable_options[0].original_price / 100,
            quantity: 1
          });

        window.dataLayer.push({ event: 'TBWAsucces', ecommerce });
      };

      sendGAdata();
    }

    setTimeout(() => {
      dispatch({ type: RESET_DATA });
      dispatch({ type: RESET_STEPPER });
    }, 2000);
  }, [
    data.extra,
    data.period,
    data.plan,
    data.venue.name,
    dispatch,
    subscriptionOptions,
    termPeriodPlan
  ]);

  const handleHomeClick = () => {
    dispatch({ type: RESET_DATA });
    dispatch({ type: RESET_STEPPER });
  };

  const renderMainCard = () => (
    <div className={classes.column8}>
      <div className={classes.main}>
        <div className={`${classes.card} ${classes.upperCard}`}>
          <div className={classes.header}>
            <Number className={classes.stepDone}>{matches ? "#" : 1}</Number>{" "}
            <div className={classes.stepHeader}>Registreren</div>
          </div>
          <div className={`${classes.description} ${classes.description1}`}>
            Je hebt net al je gegevens ingevuld, je bent bijna zover om te gaan
            sporten!
          </div>

          <Line className={classes.nextStep}>
            {step === 2 ? (
              <PulseNumber className={classes.stepActive}>
                {matches ? "#" : 2}
              </PulseNumber>
            ) : (
              <Number className={classes.stepDone}>{matches ? "#" : 2}</Number>
            )}{" "}
            <div className={`${classes.stepHeader} ${classes.step2header}`}>
              Gegevens check
              <div />
            </div>
          </Line>
          <Line className={`${classes.description} ${classes.description2}`}>
            <div>
              Je gegevens worden gecontroleerd. Na akkoord ontvang je van ons
              een e-mail met de bevestiging en de link naar de iDEAL-betaling om
              je inschrijving helemaal in orde te maken.
            </div>
          </Line>

          <Line className={classes.nextStep}>
            {step === 2 ? (
              <Number className={classes.stepNext}>{matches ? "#" : 3}</Number>
            ) : (
              <PulseNumber className={classes.step3}>
                {matches ? "#" : 3}
              </PulseNumber>
            )}{" "}
            <div className={classes.stepHeader}>Sporten!</div>
          </Line>
          <Line className={`${classes.description} ${classes.description3}`}>
            Als je de iDEAL-betaling hebt voldaan is het tijd om lekker te gaan
            sporten!
          </Line>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.column12}>
          <Title className={classes.title}>
            <div>
              {step === 2
                ? "BEDANKT VOOR JE INSCHRIJVING"
                : "Betaling is gelukt!"}
            </div>
            <span>We vinden het leuk dat je bij ons komt sporten!</span>
          </Title>
        </div>
        {matches ? (
          <>
            {renderMainCard()}
            <div className={classes.column4}>
              <div className={classes.iconContainer} />
            </div>
          </>
        ) : (
          <>
            <div className={classes.column4}>
              <div className={classes.iconContainer} />
            </div>
            {renderMainCard()}
          </>
        )}

        <div className={classes.column12}>
          <Card className={`${classes.card} ${classes.lowerCard}`}>
            <div>
              <p>
                Heb je de e-mail niet ontvangen na een paar minuten? Check dan
                even of deze in je ongewenste e-mail of spambox terecht is
                gekomen.
              </p>
              <p>
                Heb je nog vragen? Neem dan gerust contact op met ons via{" "}
                <span>900&nbsp;34&nbsp;83&nbsp;67&nbsp;37&nbsp;33</span>
              </p>
            </div>

            <div>
              <Link to="/">
                <StyledButton
                  colour={theme.palette.secondary.main}
                  className={classes.button}
                  onClick={handleHomeClick}
                >
                  Home
                </StyledButton>
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
};
