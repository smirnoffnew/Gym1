import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  CHANGE_STEP,
  BASE_URL,
  API_KEY,
  GENERAL_SALT,
  COUNTRY_CODE
} from "../constants";
import { useTheme } from "@material-ui/core/styles";
import { Title, StyledButton } from "../styles";
import useStyles from "../styles/overviewStyles";
import moment from "moment";
import "moment/locale/nl";

export default ({ scrollOutStep1, scrollToFormTop }) => {
  const classes = useStyles();
  const theme = useTheme();
  const step = useSelector(state => state.step);
  const data = useSelector(state => state.inputtedData);
  const formData = useSelector(state => state.formData);
  const dispatch = useDispatch();
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);

  const dateToPost = `${formData.year}-${
    String(formData.month).length === 2 ? formData.month : `0${formData.month}`
  }-${
    String(formData.date).length === 2 ? formData.date : `0${formData.date}`
  }`;
  const addressline1 = formData.street;
  const addressline2 = `${formData.confirmedHouseNumber}${formData.houseNumberAddition}`;
  const city = formData.city;
  const [termPeriodPlan, setTermPeriodPlan] = useState(null);

  useEffect(() => {
    if (data.plan && data.period && data.paymentTerm) {
      setTermPeriodPlan(
        subscriptionOptions[data.plan].contract_periods
          .find(item => item.period === data.period)
          .payment_periods.find(item => item.period === data.paymentTerm)
      );
    }
  }, [
    data.extra,
    data.paymentTerm,
    data.period,
    data.plan,
    subscriptionOptions
  ]);

  const renderDate = () => {
    const date =
      String(formData.date).length === 2 ? formData.date : `0${formData.date}`;
    const month =
      String(formData.month).length === 2
        ? formData.month
        : `0${formData.month}`;
    return `${date}-${month}-${formData.year}`;
  };

  const renderPrice = price => {
    switch (String(price).length) {
      case 0:
        return <>€&nbsp;0,0{String(price)}</>;
      case 1:
        return <>€&nbsp;0,0{String(price)}</>;
      case 2:
        return <>€&nbsp;0,{String(price)}</>;
      default:
        return (
          <>
            €&nbsp;{String(price).slice(0, -2)},{String(price).slice(-2)}
          </>
        );
    }
  };

  const handleEditClick = stepToRedirectTo => {
    step === 6 && dispatch({ type: CHANGE_STEP, payload: 5 });
    setTimeout(() =>
      stepToRedirectTo === 5 ? scrollToFormTop() : scrollOutStep1()
    );
  };

  const calculateCancellationDate = () => {
    moment.locale("nl");
    const date = subscriptionOptions[data.plan].contract_periods.find(
      item => item.period === data.period
    ).monthly_terminable_from;
    return moment(date, ["YYYY-MM-DD", "DD-MM-YYYY"]).format("D MMMM YYYY");
  };

  const renderContractTitle = () =>
    subscriptionOptions[data.plan].contract_periods.find(
      item => item.period === data.period
    ).title;

  const renderPlanPrice = () => {
    const planPrice = termPeriodPlan.corrected_price_per_four_week;
    return {
      render: renderPrice(planPrice),
      price: planPrice
    };
  };

  const renderAddonsNames = () => {
    const chosenAddons = [];

    if (!termPeriodPlan || !termPeriodPlan.addons) {
      return null;
    }

    termPeriodPlan.addons.forEach(addon =>
      Object.keys(data.extra).forEach(
        extra =>
          data.extra[extra] &&
          extra === addon.addon &&
          chosenAddons.push(<span key={Math.random()}>{addon.title}</span>)
      )
    );
    return chosenAddons;
  };

  const renderAddonsPrices = () => {
    const chosenAddons = [];
    let sum = 0;
    let firstPaymentSum = 0;
    let addonsPromotionDiscountSum = 0;
    termPeriodPlan.addons.forEach(addon =>
      Object.keys(data.extra).forEach(extra => {
        if (data.extra[extra] && extra === addon.addon) {
          chosenAddons.push(
            <span key={Math.random()}>
              {renderPrice(addon.price_per_four_week)}
            </span>
          );

          sum += addon.price_per_four_week;

          firstPaymentSum += !!(
            addon.promotion &&
            typeof addon.promotion.discount_price === "number"
          )
            ? addon.promotion.discount_price
            : addon.price_per_four_week;

          addonsPromotionDiscountSum += !!(
            addon.promotion && typeof addon.promotion.discount === "number"
          )
            ? addon.promotion.discount
            : 0;
        }
      })
    );
    return {
      render: chosenAddons,
      sum,
      firstPaymentSum,
      addonsPromotionDiscountSum
    };
  };

  const renderPromotionLines = () => {
    const lines = termPeriodPlan.promotion.lines;
    return lines && lines.length
      ? {
          render: lines.map(line => <span key={Math.random()}>{line}</span>),
          isRendered: true
        }
      : {
          render: null,
          isRendered: false
        };
  };

  const renderOnetimeTotal = () => {
    const component1 = termPeriodPlan.original_joining_fee
      ? termPeriodPlan.original_joining_fee
      : 0;
    const component2 =
      termPeriodPlan.expendable_options &&
      termPeriodPlan.expendable_options[0] &&
      termPeriodPlan.expendable_options[0].original_price &&
      data.extra[
        Object.keys(data.extra).find(
          // extra => extra === termPeriodPlan.expendable_options[0].option
          extra => extra === "introduction_lesson"
        )
      ]
        ? termPeriodPlan.expendable_options[0].original_price
        : 0;
    const deducted =
      termPeriodPlan.promotion && termPeriodPlan.promotion.joining_fee_discount
        ? termPeriodPlan.promotion.joining_fee_discount
        : 0;

    const sum = component1 + component2 - deducted;

    return {
      sum: sum < 0 ? 0 : sum,
      render: renderPrice(sum < 0 ? 0 : sum)
    };
  };

  const renderTotalFirstPayment = () => {
    const total =
      termPeriodPlan.corrected_price +
      renderAddonsPrices().firstPaymentSum +
      renderOnetimeTotal().sum -
      termPeriodPlan.promotion.discount;

    return {
      render: renderPrice(total > 0 ? total : 0),
      post: Number.isNaN(total) || total <= 0 ? 1 : total
    };
  };

  const sendData = () => {
    function sha512(str) {
      return crypto.subtle
        .digest("SHA-512", new TextEncoder("utf-8").encode(str))
        .then(buf => {
          return Array.prototype.map
            .call(new Uint8Array(buf), x => ("00" + x.toString(16)).slice(-2))
            .join("");
        });
    }

    const addons = Object.keys(data.extra)
      .filter(key => key !== "introduction_lesson")
      .filter(key => data.extra[key] === true);
    const options = data.extra.introduction_lesson
      ? ["introduction_lesson"]
      : [];

    const timestamp = Date.now();

    const stringForHash = `${data.venue.id}${data.plan}${data.period}${data.paymentTerm}${formData.firstName}${formData.lastName}${formData.gender}${dateToPost}${COUNTRY_CODE}${addressline1}${addressline2}${formData.confirmedPostcode}${city}${COUNTRY_CODE}${formData.telephone}${formData.email}${timestamp}${GENERAL_SALT}`;

    sha512(stringForHash).then(hash => {
      axios({
        method: "post",
        url: `${BASE_URL}/v2/subscription/signup`,
        data: {
          key: API_KEY,
          timestamp: timestamp,
          venueid: String(data.venue.id),
          membershiptype: data.plan,
          contractperiod: data.period,
          paymentperiod: data.paymentTerm,
          addons: addons,
          options: options,
          firstname: formData.firstName,
          lastname: formData.lastName,
          gender: formData.gender,
          dateofbirth: dateToPost,
          language: COUNTRY_CODE,
          addressline1: addressline1,
          addressline2: addressline2,
          postcode: formData.confirmedPostcode,
          city: city,
          country: COUNTRY_CODE,
          phone: formData.telephone,
          email: formData.email,
          amount: String(renderTotalFirstPayment().post),
          hash: hash
        }
      }).catch(error => {
        console.dir(error);
      });
    });
  };

  const handleNextClick = () => {
    sendData();
  };

  return (
    step === 6 && (
      <div className={classes.wrapper}>
        <Title className={classes.title}>
          <h1>Controleer je gegevens</h1>
          <span>
            Controleer hier al je gegevens of het allemaal klopt. Als het niet
            goed is kan je het nu nog aanpassen.
          </span>
        </Title>

        <div className={classes.card}>
          <div className={classes.line1}>
            <span>{formData.gender === "male" ? "Dhr." : "Mevr."}</span>
            <span onClick={() => handleEditClick(5)}>wijzig</span>
          </div>
          <div className={classes.line2}>
            {formData.firstName + " " + formData.lastName}
          </div>
          <div className={`${classes.line3} ${classes.dataWrapper}`}>
            <div className={classes.dateOfBirth}>
              <span>Geboortedatum</span>
              <span>{renderDate()}</span>
            </div>
            <div className={classes.postcode}>
              <span>Postcode</span>
              <span>{`${formData.confirmedPostcode.slice(
                0,
                4
              )} ${formData.confirmedPostcode.slice(-2)}`}</span>
            </div>
            <div className={classes.address}>
              <span>Adres</span>
              <span>
                <p>{`${addressline1} ${addressline2}`}</p>
                <p>{formData.city}</p>
              </span>
            </div>
          </div>
          <div className={classes.dataWrapper}>
            <div className={classes.telephone}>
              <span>Telefoonnummer</span>
              <span>{`+31 ${formData.telephone.charAt(
                1
              )} ${formData.telephone.slice(2, 5)} ${formData.telephone.slice(
                5,
                8
              )} ${formData.telephone.slice(8)}`}</span>
            </div>
            <div>
              <span>E-mailadres</span>
              <span>{formData.email}</span>
            </div>
          </div>
        </div>

        <div className={classes.card2}>
          <div className={classes.card2block1}>
            <span>Jouw Fit For Free abonnement</span>
            <span onClick={() => handleEditClick(2)}>wijzig</span>
          </div>

          <div className={classes.card2block2}>
            <div>
              <span>Kosten per 4 weken</span>
              <span>
                {subscriptionOptions[data.plan].name} {renderContractTitle()}
              </span>
              {renderAddonsNames()}
            </div>

            <div>
              <span />
              <span>{renderPlanPrice().render}</span>
              {renderAddonsPrices().render}
            </div>
          </div>

          {renderPromotionLines().isRendered && (
            <div className={classes.card2block3}>
              <span>Eenmalige korting</span>
              {renderPromotionLines().render}
            </div>
          )}

          <div className={classes.card2block4}>
            <div>Abonnementskosten</div>
            <div>
              <span>
                {renderPrice(
                  renderPlanPrice().price + renderAddonsPrices().sum
                )}
              </span>
              <span>Per 4 weken</span>
            </div>
          </div>

          {!!termPeriodPlan.promotion &&
            typeof termPeriodPlan.promotion.discount === "number" && (
              <div className={classes.card2block5}>
                <div>
                  Voordeel op het abonnement en de eventueel door jou gekozen
                  aanvullingen
                </div>
                <div>
                  <span>
                    {renderPrice(
                      termPeriodPlan.promotion.discount +
                        renderAddonsPrices().addonsPromotionDiscountSum
                    )}
                  </span>
                </div>
              </div>
            )}

          <div className={classes.card2block6}>
            <div>
              <span className={classes.card2block6line1}>Eenmalige kosten</span>

              {!!termPeriodPlan &&
                typeof termPeriodPlan.original_joining_fee === "number" && (
                  <span className={classes.card2block6line2}>
                    Inschrijfgeld
                  </span>
                )}

              {!!termPeriodPlan &&
                !!termPeriodPlan.expendable_options &&
                !!termPeriodPlan.expendable_options.length &&
                data.extra[
                  Object.keys(data.extra).find(
                    // extra => extra === termPeriodPlan.expendable_options[0].option
                    extra => extra === "introduction_lesson"
                  )
                ] && (
                  <span className={classes.card2block6line3}>
                    {termPeriodPlan.expendable_options[0].title}
                  </span>
                )}

              {!!termPeriodPlan.promotion &&
                !!termPeriodPlan.promotion.title &&
                typeof termPeriodPlan.promotion.joining_fee_discount ===
                  "number" && (
                  <span className={classes.card2block6line4}>
                    {termPeriodPlan.promotion.title}
                  </span>
                )}

              <span className={classes.card2block6line5}>Totaal eenmalig</span>
            </div>

            <div>
              <span />
              {!!termPeriodPlan &&
                typeof termPeriodPlan.original_joining_fee === "number" && (
                  <span className={classes.card2block6line2}>
                    {renderPrice(termPeriodPlan.original_joining_fee)}
                  </span>
                )}

              {!!termPeriodPlan &&
                !!termPeriodPlan.expendable_options &&
                !!termPeriodPlan.expendable_options.length &&
                data.extra[
                  Object.keys(data.extra).find(
                    // extra => extra === termPeriodPlan.expendable_options[0].option
                    extra => extra === "introduction_lesson"
                  )
                ] && (
                  <span className={classes.card2block6line3}>
                    {renderPrice(
                      termPeriodPlan.expendable_options[0].original_price
                    )}
                  </span>
                )}

              {!!termPeriodPlan.promotion &&
                !!termPeriodPlan.promotion.title &&
                typeof termPeriodPlan.promotion.joining_fee_discount ===
                  "number" && (
                  <span
                    className={`${classes.card2block6line4} ${classes.card2block6line4end}`}
                  >
                    -&nbsp;
                    {renderPrice(termPeriodPlan.promotion.joining_fee_discount)}
                  </span>
                )}

              <span className={classes.card2block6line5}>
                {renderOnetimeTotal().render}
              </span>
            </div>
          </div>

          {!!termPeriodPlan.promotion &&
            typeof termPeriodPlan.promotion.total_subscripion_discount ===
              "number" && (
              <div className={classes.card2block7}>
                <span>Totaal voordeel</span>
                <span>
                  {renderPrice(
                    termPeriodPlan.promotion.total_subscripion_discount
                  )}
                </span>
              </div>
            )}

          {!!termPeriodPlan.corrected_price &&
            typeof termPeriodPlan.promotion.discount === "number" && (
              <div className={classes.card2block8}>
                <span>Totaal eerste betaling</span>

                <span>{renderTotalFirstPayment().render}</span>
              </div>
            )}

          <div className={classes.card2block9}>
            <span>Maandelijks opzegbaar vanaf&nbsp;</span>
            <span>{calculateCancellationDate()}</span>
          </div>

          <div className={classes.card2block10}>
            <Link to="/gratitude">
              <StyledButton
                className={classes.button}
                colour={theme.palette.secondary.main}
                type="submit"
                onClick={handleNextClick}
              >
                Versturen
              </StyledButton>
            </Link>
          </div>
        </div>
        {window.scrollTo(0, 0)}
      </div>
    )
  );
};
