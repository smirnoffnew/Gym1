import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_STEP, INPUT_DATA } from "../constants";
import useStyles from "../styles/receiptStyles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { StyledButton } from "../styles";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import "moment/locale/nl";

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery("(min-width: 960px)");
  const dispatch = useDispatch();
  const data = useSelector(state => state.inputtedData);
  const errors = useSelector(state => state.errors);
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);
  const [open, setOpen] = useState(false);
  const [termPeriodPlan, setTermPeriodPlan] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);

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

  useEffect(() => {
    Object.values(errors).some(error => error === true || error === null)
      ? setDisabledButton(true)
      : setDisabledButton(false);
  }, [errors]);

  useEffect(() => {
    matches &&
      data.removeSidePaddings !== null &&
      dispatch({
        type: INPUT_DATA,
        payload: {
          removeSidePaddings: null
        }
      });
  }, [data.removeSidePaddings, dispatch, matches]);

  const maximize = affectSidePaddings => {
    setOpen(true);

    affectSidePaddings &&
      dispatch({
        type: INPUT_DATA,
        payload: {
          removeSidePaddings: true
        }
      });
  };

  const minimize = affectSidePaddings => {
    setOpen(false);

    affectSidePaddings &&
      dispatch({
        type: INPUT_DATA,
        payload: {
          removeSidePaddings: false
        }
      });
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

  const renderPlanPrice = () => {
    if (!termPeriodPlan || !termPeriodPlan.corrected_price_per_four_week) {
      return null;
    }
    const planPrice = termPeriodPlan.corrected_price_per_four_week;
    return {
      render: renderPrice(planPrice),
      price: planPrice
    };
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
      sum: sum,
      firstPaymentSum,
      addonsPromotionDiscountSum
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
          chosenAddons.push(<div key={Math.random()}>{addon.title}</div>) // +
      )
    );
    return chosenAddons;
  };

  const renderContractTitle = () => {
    if (
      !subscriptionOptions[data.plan] ||
      !subscriptionOptions[data.plan].contract_periods ||
      !subscriptionOptions[data.plan].contract_periods.find(
        item => item.period === data.period
      )
    ) {
      return null;
    }

    return subscriptionOptions[data.plan].contract_periods.find(
      item => item.period === data.period
    ).title;
  };

  const handleButtonClick = e => {
    dispatch({ type: CHANGE_STEP, payload: 6 });
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

    return {
      sum: component1 + component2 - deducted,
      render: renderPrice(component1 + component2 - deducted)
    };
  };

  const renderTotalFirstPayment = () => {
    const total =
      termPeriodPlan.corrected_price +
      renderAddonsPrices().firstPaymentSum +
      renderOnetimeTotal().sum -
      termPeriodPlan.promotion.discount;
    return renderPrice(total > 0 ? total : 0);
  };

  const calculateCancellationDate = () => {
    moment.locale("nl");
    const date = subscriptionOptions[data.plan].contract_periods.find(
      item => item.period === data.period
    ).monthly_terminable_from;
    return moment(date, ["YYYY-MM-DD", "DD-MM-YYYY"]).format("D MMMM YYYY");
  };

  return (
    data.plan &&
    termPeriodPlan &&
    (open ? (
      <div className={`${classes.wrapper} receipt_wrapper_safari_only `}>
        <div className={`${classes.container} ${classes.maximizedContainer}`}>
          <div> Jouw Fit For Free abonnement </div>
          <div
            onClick={() => minimize(matches ? false : true)}
            className={classes.minimizeButton}
          >
            {matches ? (
              <>
                Toon minder
                <div className={classes.arrowUp} />
              </>
            ) : (
              <AddIcon />
            )}
          </div>

          <div className={classes.maximizedContainer_block2}>
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

          {!matches && <div className={classes.mobileMaximizedBorder} />}

          {renderPromotionLines().isRendered && (
            <div className={classes.maximizedContainer_block3}>
              <span>Eenmalige korting</span>
              {renderPromotionLines().render}
            </div>
          )}

          {!matches && <div className={classes.mobileMaximizedBorder} />}

          <div className={classes.maximizedContainer_block4}>
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

          {!matches && <div className={classes.mobileMaximizedBorder} />}

          {!!termPeriodPlan.promotion &&
            typeof termPeriodPlan.promotion.discount === "number" && (
              <div className={classes.maximizedContainer_block5}>
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

          {!matches && <div className={classes.mobileMaximizedBorder} />}

          <div className={classes.maximizedContainer_block6}>
            <div>
              <span className={classes.maximizedContainer_block6line1}>
                Eenmalige kosten
              </span>

              {termPeriodPlan &&
                typeof termPeriodPlan.original_joining_fee === "number" && (
                  <span className={classes.maximizedContainer_block6line2}>
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
                  <span className={classes.maximizedContainer_block6line3}>
                    {termPeriodPlan.expendable_options[0].title}
                  </span>
                )}

              {!!termPeriodPlan.promotion &&
                !!termPeriodPlan.promotion.title &&
                typeof termPeriodPlan.promotion.joining_fee_discount ===
                  "number" && (
                  <span className={classes.maximizedContainer_block6line4}>
                    {termPeriodPlan.promotion.title}
                  </span>
                )}

              <span className={classes.maximizedContainer_block6line5}>
                Totaal eenmalig
              </span>
            </div>

            <div>
              <span />
              {termPeriodPlan &&
                typeof termPeriodPlan.original_joining_fee === "number" && (
                  <span className={classes.maximizedContainer_block6line2}>
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
                  <span className={classes.maximizedContainer_block6line3}>
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
                    className={`${classes.maximizedContainer_block6line4} ${classes.maximizedContainer_block6line4end}`}
                  >
                    -&nbsp;
                    {renderPrice(termPeriodPlan.promotion.joining_fee_discount)}
                  </span>
                )}

              <span className={classes.maximizedContainer_block6line5}>
                {renderOnetimeTotal().render}
              </span>
            </div>
          </div>

          {!matches && <div className={classes.mobileMaximizedBorder} />}

          {!!termPeriodPlan.promotion &&
            typeof termPeriodPlan.promotion.total_subscripion_discount ===
              "number" && (
              <div className={classes.maximizedContainer_block7}>
                <span>Totaal voordeel</span>
                <span>
                  {renderPrice(
                    termPeriodPlan.promotion.total_subscripion_discount
                  )}
                </span>
              </div>
            )}

          {!matches && <div className={classes.mobileMaximizedBorder} />}

          {!!termPeriodPlan.corrected_price &&
            typeof termPeriodPlan.promotion.discount === "number" && (
              <div className={classes.maximizedContainer_block8}>
                <span>Totaal eerste betaling</span>
                <span>{renderTotalFirstPayment()}</span>
              </div>
            )}

          {!matches && <div className={classes.mobileMaximizedBorder} />}

          <div className={classes.maximizedContainer_block9}>
            <span>Maandelijks opzegbaar vanaf&nbsp;</span>
            <span>{calculateCancellationDate()}</span>
          </div>

          <div
            className={`${classes.buttonWrapper} ${classes.maximizedContainer_block10}`}
          >
            <StyledButton
              className={`${classes.button} ${disabledButton &&
                classes.buttonDisabled}`}
              colour={theme.palette.secondary.main}
              onClick={handleButtonClick}
              disabled={disabledButton}
            >
              Versturen
            </StyledButton>
          </div>
        </div>
      </div>
    ) : matches ? (
      <div className={`${classes.wrapper} receipt_wrapper_safari_only `}>
        <div className={`${classes.container} ${classes.minimizedContainer}`}>
          <div> Jouw Fit For Free abonnement </div>
          <div onClick={() => maximize(false)}>
            Toon meer
            <div className={classes.arrowDown} />
          </div>

          <div className={classes.minWrapper}>
            <div className={classes.minDataWrapper}>
              <div>Abonnementskosten</div>
              <div>
                {subscriptionOptions[data.plan].name} {renderContractTitle()}
              </div>
              {renderAddonsNames()}
            </div>

            <div className={classes.minPriceWrapper}>
              <div>
                {renderPrice(
                  renderPlanPrice().price + renderAddonsPrices().sum
                )}
              </div>
              <div>Per 4 weken</div>
            </div>
          </div>

          <div className={classes.buttonWrapper}>
            <StyledButton
              className={`${classes.button} ${disabledButton &&
                classes.buttonDisabled}`}
              colour={theme.palette.secondary.main}
              onClick={handleButtonClick}
              disabled={disabledButton}
            >
              Versturen
            </StyledButton>
          </div>
        </div>
      </div>
    ) : (
      <div className={classes.minimizedMobContainer}>
        <div
          onClick={() => {
            maximize(true);
          }}
        >
          <div />
        </div>

        <div>
          <div>Abonnementskosten</div>
          <div>
            {subscriptionOptions[data.plan].name} {renderContractTitle()}
          </div>
        </div>
        <div>
          <div>
            {renderPrice(renderPlanPrice().price + renderAddonsPrices().sum)}
          </div>
          <div>per 4 weken</div>
        </div>
        <div
          className={`${disabledButton && classes.buttonDisabled}`}
          onClick={() => {
            if (disabledButton) return;
            handleButtonClick();
          }}
        >
          <div />
        </div>
      </div>
    ))
  );
};
