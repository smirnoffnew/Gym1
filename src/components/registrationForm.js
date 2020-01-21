import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import InputMask from "react-input-mask";
import {
  TextField,
  Radio,
  Checkbox,
  MenuItem,
  Select
} from "@material-ui/core";
import { StyledButton } from "../styles";
import axios from "axios";
import {
  INPUT_FORM_DATA,
  HANDLE_ERROR,
  NAME_REGEX,
  DUTCH_POSTCODE_REGEX,
  HOUSENUMBER_REGEX,
  ADDITION_REGEX,
  DUTCH_MOB_PHONE_REGEX,
  EMAIL_REGEX,
  POSTCODE_URL,
  CHANGE_STEP
} from "../constants";
import useStyles from "../styles/formStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import moment from "moment";
import { debounce } from "lodash";

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  const data = useSelector(state => state.inputtedData);
  const formData = useSelector(state => state.formData);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();
  const desktopWidth = useMediaQuery("(min-width:960px)");
  const xsWidth = useMediaQuery("(max-width:376.95px)");
  const xxsWidth = useMediaQuery("(max-width:324.95px)");
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const subscriptionOptions = useSelector(state => state.subscriptionOptions);

  const renderContractTitle = () => {
    const termPhrase = subscriptionOptions[data.plan].contract_periods
      .find(item => item.period === data.period)
      .payment_periods.find(item => item.period === data.paymentTerm).title;
    return termPhrase === "per jaar" ? "per 1 jaar" : termPhrase;
  };

  const delayedQuery = useCallback(
    debounce(
      (
        postcode,
        houseNumber,
        houseNumberAddition,
        postcodeError,
        houseNumberError
      ) => {
        if (
          !postcodeError &&
          !houseNumberError &&
          postcode &&
          postcode.length === 6 &&
          houseNumber
        ) {
          axios
            .get(POSTCODE_URL, {
              params: {
                postcode,
                houseNumber,
                houseNumberAddition
              }
            })
            .then(({ data }) => {
              dispatch({ type: INPUT_FORM_DATA, payload: { city: data.city } });
              dispatch({
                type: INPUT_FORM_DATA,
                payload: { street: data.street }
              });
              dispatch({
                type: INPUT_FORM_DATA,
                payload: { confirmedHouseNumber: data.houseNumber }
              });

              dispatch({
                type: INPUT_FORM_DATA,
                payload: { confirmedPostcode: data.postcode }
              });
              dispatch({ type: HANDLE_ERROR, payload: { city: false } });
              dispatch({ type: HANDLE_ERROR, payload: { street: false } });
            })

            .catch(error => {
              console.dir(error);
              dispatch({ type: INPUT_FORM_DATA, payload: { city: "" } });
              dispatch({ type: INPUT_FORM_DATA, payload: { street: "" } });
              dispatch({
                type: INPUT_FORM_DATA,
                payload: { confirmedHouseNumber: "" }
              });
              dispatch({
                type: INPUT_FORM_DATA,
                payload: { confirmedPostcode: "" }
              });
              dispatch({ type: HANDLE_ERROR, payload: { city: true } });
              dispatch({ type: HANDLE_ERROR, payload: { street: true } });
            });
        }
      },
      250
    ),
    []
  );

  const defineDatesNumber = (month = null, year = null) => {
    if (!month && formData.month === "none") return 31;
    switch (month ? month : formData.month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 2:
        return year
          ? new Date(year, 1, 29).getDate() === 29
            ? 29
            : 28
          : formData.year === "none"
          ? 29
          : new Date(formData.year, 1, 29).getDate() === 29
          ? 29
          : 28;
      default:
        return 30;
    }
  };

  const renderDateOptions = () => {
    const select = [
      <MenuItem value="none" disabled key={0}>
        Dag
      </MenuItem>
    ];
    for (let i = 1; i <= defineDatesNumber(); i++) {
      select.push(
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
    }
    return select;
  };

  const renderMonthOptions = () => {
    const select = [
      <MenuItem value="none" disabled key={0}>
        Maand
      </MenuItem>
    ];
    for (let i = 1; i <= 12; i++) {
      select.push(
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
    }
    return select;
  };

  const renderYearOptions = () => {
    const start = 1930;
    const end = new Date().getFullYear();
    const select = [];
    for (let i = start; i <= end; i++) {
      select.push(
        <MenuItem value={i} key={i}>
          {i}
        </MenuItem>
      );
    }
    select.push(
      <MenuItem value="none" disabled key={0}>
        Jaar
      </MenuItem>
    );
    return select.reverse();
  };

  const inputData = (type, value) => {
    type !== "houseNumberAddition" &&
      value !== "" &&
      dispatch({ type: HANDLE_ERROR, payload: { [type]: false } });

    type === "email" &&
      dispatch({ type: HANDLE_ERROR, payload: { email: false } });

    if (type === "year" && formData.date > defineDatesNumber(null, value)) {
      dispatch({ type: INPUT_FORM_DATA, payload: { date: "none" } });
      dispatch({ type: HANDLE_ERROR, payload: { date: true } });
    }

    if (type === "month" && formData.date > defineDatesNumber(value)) {
      dispatch({ type: INPUT_FORM_DATA, payload: { date: "none" } });
      dispatch({ type: HANDLE_ERROR, payload: { date: true } });
    }

    dispatch({ type: INPUT_FORM_DATA, payload: { [type]: value } });
  };

  const checkCheckbox = property => {
    dispatch({
      type: HANDLE_ERROR,
      payload: { [property]: !Boolean(formData[property]) }
    });
  };

  const checkFirstName = () => {
    !formData.firstName || !NAME_REGEX.test(formData.firstName)
      ? dispatch({ type: HANDLE_ERROR, payload: { firstName: true } })
      : dispatch({ type: HANDLE_ERROR, payload: { firstName: false } });
  };

  const checkLastName = () => {
    !formData.lastName || !NAME_REGEX.test(formData.lastName)
      ? dispatch({ type: HANDLE_ERROR, payload: { lastName: true } })
      : dispatch({ type: HANDLE_ERROR, payload: { lastName: false } });
  };

  const checkPostcode = (value = formData.postcode) => {
    if (value && value.length < 6) {
      dispatch({
        type: HANDLE_ERROR,
        payload: { postcode: true }
      });
      return true;
    }

    if (!value || !DUTCH_POSTCODE_REGEX.test(value)) {
      dispatch({ type: HANDLE_ERROR, payload: { postcode: true } });
      return false;
    }

    dispatch({ type: HANDLE_ERROR, payload: { postcode: false } });
    return true;
  };

  const checkHouseNumber = () => {
    !formData.houseNumber || !HOUSENUMBER_REGEX.test(formData.houseNumber)
      ? dispatch({ type: HANDLE_ERROR, payload: { houseNumber: true } })
      : dispatch({ type: HANDLE_ERROR, payload: { houseNumber: false } });
  };

  const checkPhoneNumber = () => {
    !formData.telephone || !DUTCH_MOB_PHONE_REGEX.test(formData.telephone)
      ? dispatch({ type: HANDLE_ERROR, payload: { telephone: true } })
      : dispatch({ type: HANDLE_ERROR, payload: { telephone: false } });
  };

  const checkEmail = () => {
    !formData.email || !EMAIL_REGEX.test(formData.email)
      ? dispatch({ type: HANDLE_ERROR, payload: { email: true } })
      : dispatch({ type: HANDLE_ERROR, payload: { email: false } });
  };

  const checkBirthDate = property => {
    formData[property] === "none" &&
      dispatch({ type: HANDLE_ERROR, payload: { [property]: true } });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: CHANGE_STEP, payload: 6 });
  };

  const handlePostcodeInputKeyUp = e => {
    e.target.value.trim().length === 6 &&
      checkPostcode(e.target.value.slice(0, 6));
  };

  const handlePostcodeInputChange = e => {
    if (checkPostcode(e.target.value.slice(0, 6).trim())) {
      inputData(
        "postcode",
        e.target.value
          .toUpperCase()
          .slice(0, 6)
          .trim()
      );
      e.target.value
        .toUpperCase()
        .slice(0, 6)
        .trim().length === 6 &&
        delayedQuery(
          e.target.value.slice(0, 6),
          formData.houseNumber,
          formData.houseNumberAddition,
          false,
          errors.houseNumber
        );
    }
  };

  const postcodeInputAttributes = {
    value: formData.postcode ? formData.postcode : "",
    onKeyUp: e => handlePostcodeInputKeyUp(e),
    onChange: e => handlePostcodeInputChange(e),
    onBlur: () => checkPostcode()
  };

  const handleTelephoneInputKeyUp = e => {
    e.target.value.trim().length === 10 && checkPhoneNumber();
  };

  const handleTelephoneInputChange = e => {
    inputData("telephone", e.target.value);
  };

  const telephoneInputAttributes = {
    value: formData.telephone ? formData.telephone : "",
    onKeyUp: e => handleTelephoneInputKeyUp(e),
    onChange: e => handleTelephoneInputChange(e),
    onBlur: e => checkPhoneNumber(e)
  };

  useEffect(() => {
    Object.values(errors).some(error => error === true || error === null)
      ? setDisabledSubmit(true)
      : setDisabledSubmit(false);
  }, [errors]);

  useEffect(() => {
    if (
      formData.date !== "none" &&
      formData.month !== "none" &&
      formData.year !== "none"
    ) {
      const birthday = moment(
        `${formData.date}.${formData.month}.${formData.year}`,
        "DD.MM.YYYY"
      );
      const age = moment().diff(birthday, "years");
      if (age < 16) {
        !errors.date &&
          dispatch({ type: HANDLE_ERROR, payload: { date: true } });
        !errors.month &&
          dispatch({ type: HANDLE_ERROR, payload: { month: true } });
        !errors.year &&
          dispatch({ type: HANDLE_ERROR, payload: { year: true } });
      } else {
        dispatch({ type: HANDLE_ERROR, payload: { date: false } });
        dispatch({ type: HANDLE_ERROR, payload: { month: false } });
        dispatch({ type: HANDLE_ERROR, payload: { year: false } });
      }
    }
  }, [
    dispatch,
    errors.date,
    errors.month,
    errors.year,
    formData.date,
    formData.month,
    formData.year
  ]);

  return (
    <form className={classes.form}>
      <div className={classes.wrapper}>
        <div className={classes.line1wrapper}>
          <div className={classes.line1}>
            <div
              className={`${classes.radioWraper} ${errors.gender &&
                classes.errorInput}`}
              onClick={() => inputData("gender", "male")}
            >
              <Radio
                className={`${classes.radio} ${(formData.gender === null ||
                  formData.gender === "female") &&
                  classes.uncheckedRadio}`}
                checked={formData.gender === "male"}
                onBlur={() => checkCheckbox("gender")}
              />
              <span>Dhr.</span>
            </div>

            <div
              className={`${classes.radioWraper} ${errors.gender &&
                classes.errorInput}`}
              onClick={() => inputData("gender", "female")}
            >
              <Radio
                className={`${classes.radio} ${(formData.gender === null ||
                  formData.gender === "male") &&
                  classes.uncheckedRadio}`}
                checked={formData.gender === "female"}
                onBlur={() => checkCheckbox("gender")}
              />
              <span>Mevr.</span>
            </div>
          </div>
        </div>

        <div className={classes.lineDefaultWrapper}>
          <div className={classes.lineDefault}>
            <TextField
              className={`${classes.field} ${errors.firstName &&
                classes.errorInput}`}
              color="secondary"
              placeholder="Voornaam"
              value={formData.firstName ? formData.firstName : ""}
              onKeyPress={e => !NAME_REGEX.test(e.key) && e.preventDefault()}
              onChange={e => inputData("firstName", e.target.value)}
              onBlur={checkFirstName}
              name="firstName"
            />

            <TextField
              className={`${classes.field} ${errors.lastName &&
                classes.errorInput}`}
              color="secondary"
              placeholder="Achternaam"
              value={formData.lastName ? formData.lastName : ""}
              onKeyPress={e => !NAME_REGEX.test(e.key) && e.preventDefault()}
              onChange={e => inputData("lastName", e.target.value)}
              onBlur={checkLastName}
              name="lastName"
            />
          </div>
        </div>

        <span className={classes.birthDateTitle}>Geboortedatum</span>

        <div className={classes.lineDefaultWrapper}>
          <div className={classes.lineDefault}>
            <div
              className={
                xxsWidth
                  ? classes.selectSmallDesignWrapper
                  : classes.selectWrapper
              }
            >
              <Select
                className={`
                ${classes.field} 
                ${classes.select} 
                ${formData.date === "none" && classes.placeholder}  
                ${errors.date && classes.errorInput && classes.errorInput}
                ${errors.date &&
                  classes.errorInput &&
                  !xxsWidth &&
                  classes.errorDateInput}`}
                color="secondary"
                defaultValue="none"
                value={formData.date}
                style={xsWidth ? { marginTop: 15, width: "100%" } : null}
                onChange={e => inputData("date", e.target.value)}
                onBlur={() => checkBirthDate("date")}
              >
                {renderDateOptions()}
              </Select>

              <Select
                className={`
                ${classes.field} 
                ${classes.select} 
                ${formData.month === "none" && classes.placeholder}  
                ${errors.month && classes.errorInput && classes.errorInput}
                ${errors.month &&
                  classes.errorInput &&
                  !xxsWidth &&
                  classes.errorDateInput}`}
                color="secondary"
                defaultValue="none"
                value={formData.month}
                style={xsWidth ? { marginTop: 15, width: "100%" } : null}
                onChange={e => {
                  inputData("month", e.target.value);
                }}
                onBlur={() => checkBirthDate("month")}
              >
                {renderMonthOptions()}
              </Select>

              <Select
                className={`
                ${classes.field} 
                ${classes.select} 
                ${formData.year === "none" && classes.placeholder} 
                ${errors.year &&
                  classes.errorInput &&
                  `${classes.errorInput} ${classes.errorDateInput}`}`}
                color="secondary"
                defaultValue="none"
                value={formData.year}
                style={xsWidth ? { marginTop: 15, width: "100%" } : null}
                onChange={e => inputData("year", e.target.value)}
                onBlur={() => checkBirthDate("year")}
              >
                {renderYearOptions()}
              </Select>
            </div>
            {desktopWidth && <div />}
          </div>

          {(errors.date || errors.month || errors.year) && (
            <div className={classes.errorLine}>
              Om je online in te schrijven dien je minimaal 16 jaar oud te zijn.
              Aan de balie kun je je inschrijven vanaf 12 jaar, indien je
              ouders/voogd erbij zijn om akkoord te geven.
            </div>
          )}
        </div>

        <div className={classes.lineDefaultWrapper}>
          <div className={classes.lineDefault}>
            <div
              className={`${classes.address1wrapper} ${
                xxsWidth ? "" : classes.addressSmallDesignWrapper
              }`}
              style={
                xsWidth ? { display: "flex", flexDirection: "column" } : null
              }
            >
              {formData.postcode ? (
                <InputMask
                  mask="9999aa"
                  maskchar=" "
                  maskPlaceholder=" "
                  {...postcodeInputAttributes}
                  className={`
                  ${classes.field} 
                  ${(errors.postcode || errors.city || errors.street) &&
                    classes.errorInput}
                  `}
                  style={xsWidth ? { width: "100%", marginBottom: 15 } : null}
                  name="postcode"
                  autoFocus
                >
                  <TextField color="secondary" placeholder="Postcode" />
                </InputMask>
              ) : (
                <TextField
                  color="secondary"
                  placeholder="Postcode"
                  {...postcodeInputAttributes}
                  className={`
                  ${classes.field} 
                  ${(errors.postcode || errors.city || errors.street) &&
                    classes.errorInput}
                  `}
                  style={xsWidth ? { width: "100%", marginBottom: 15 } : null}
                  name="postcode"
                />
              )}

              <TextField
                className={`
                ${classes.field} 
                ${(errors.houseNumber || errors.city || errors.street) &&
                  classes.errorInput}
                `}
                style={xsWidth ? { width: "100%" } : null}
                color="secondary"
                placeholder="Huisnummer"
                value={formData.houseNumber ? formData.houseNumber : ""}
                onKeyPress={e => {
                  !HOUSENUMBER_REGEX.test(e.key) && e.preventDefault();
                }}
                onChange={e => {
                  inputData("houseNumber", e.target.value);
                  delayedQuery(
                    formData.postcode,
                    e.target.value,
                    formData.houseNumberAddition,
                    errors.postcode,
                    errors.houseNumber
                  );
                }}
                onBlur={checkHouseNumber}
                name="houseNumber"
              />
            </div>

            <TextField
              className={classes.field}
              color="secondary"
              placeholder="Toevoeging"
              value={
                formData.houseNumberAddition ? formData.houseNumberAddition : ""
              }
              onKeyPress={e =>
                !ADDITION_REGEX.test(e.key) && e.preventDefault()
              }
              onChange={e => {
                if (ADDITION_REGEX.test(e.target.value)) {
                  inputData("houseNumberAddition", e.target.value);
                } else e.preventDefault();
              }}
              name="houseNumberAddition"
            />
          </div>

          {formData.city &&
            formData.street &&
            formData.confirmedPostcode &&
            formData.confirmedHouseNumber &&
            !errors.city &&
            !errors.street &&
            !errors.postcode &&
            !errors.houseNumber && (
              <div className={classes.lineDefault}>
                <div>
                  <div
                    className={`${classes.field} ${classes.address2wrapper}`}
                  >
                    <p>{`${formData.street} ${formData.confirmedHouseNumber}
                    ${formData.houseNumberAddition}`}</p>
                    <p>{`${formData.confirmedPostcode.slice(
                      0,
                      4
                    )} ${formData.confirmedPostcode.slice(-2)} ${
                      formData.city
                    }`}</p>
                  </div>
                </div>
                {desktopWidth && <div />}
              </div>
            )}
        </div>

        <div className={classes.lineDefaultWrapper}>
          <div className={classes.lineDefault}>
            {formData.telephone ? (
              <InputMask
                mask="0699999999"
                maskchar=" "
                maskPlaceholder=" "
                className={`${classes.field} ${errors.telephone &&
                  classes.errorInput}`}
                name="telephone"
                {...telephoneInputAttributes}
                autoFocus
              >
                <TextField color="secondary" placeholder="Telefoonnummer" />
              </InputMask>
            ) : (
              <TextField
                color="secondary"
                placeholder="Telefoonnummer"
                name="telephone"
                className={`${classes.field} ${errors.telephone &&
                  classes.errorInput}`}
                {...telephoneInputAttributes}
              />
            )}

            {desktopWidth && <div />}
          </div>
        </div>

        <div className={classes.lineDefaultWrapper}>
          <div className={classes.lineDefault}>
            <TextField
              className={`${classes.field} ${(errors.email ||
                errors.emailInvalid) &&
                classes.errorInput}`}
              color="secondary"
              placeholder="E-mail"
              type="email"
              value={formData.email ? formData.email : ""}
              onChange={e => inputData("email", e.target.value)}
              onBlur={checkEmail}
              name="email"
            />
            {desktopWidth && <div />}
          </div>
        </div>
      </div>

      <div className={classes.conditionWrapper}>
        <div className={classes.conditionLine}>
          <Checkbox
            className={`${classes.checkbox} ${
              formData.condition1 ? classes.checked : classes.unchecked
            }`}
            checked={formData.condition1}
            onClick={() => inputData("condition1", !formData.condition1)}
            onBlur={() => checkCheckbox("condition1")}
          />
          Ik ga akkoord met de betaalwijze {renderContractTitle()} en geef
          toestemming aan Fit For Free middels een iDEAL-betaling doorlopende
          incasso-opdrachten te sturen naar mijn bank.{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.fitforfree.nl/automatische-incasso-informatie"
          >
            Lees meer
          </a>
        </div>
      </div>

      <div className={classes.conditionWrapper}>
        <div className={classes.conditionLine}>
          <Checkbox
            className={`${classes.checkbox} ${
              formData.condition2 ? classes.checked : classes.unchecked
            }`}
            checked={formData.condition2}
            onClick={() => inputData("condition2", !formData.condition2)}
            onBlur={() => checkCheckbox("condition2")}
          />
          Ik ga akkoord met de algemene voorwaarden en de huisregels.{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.fitforfree.nl/algemene-voorwaarden-NL"
          >
            Lees meer
          </a>
        </div>
      </div>

      <div className={classes.conditionWrapper}>
        <div className={classes.conditionLine}>
          <Checkbox
            className={`${classes.checkbox} ${
              formData.condition3 ? classes.checked : classes.unchecked
            }`}
            checked={formData.condition3}
            onClick={() => inputData("condition3", !formData.condition3)}
            onBlur={() => checkCheckbox("condition3")}
          />
          Ik ga akkoord dat mijn lidmaatschap per direct in gaat. En daarmee de{" "}
          <b>wettelijke bedenktermijn van 14 dagen.</b>
        </div>
      </div>

      <div className={classes.buttonLine}>
        <StyledButton
          className={`${classes.button} ${disabledSubmit &&
            classes.buttonDisabled}`}
          colour={theme.palette.secondary.main}
          type="submit"
          onClick={handleSubmit}
          disabled={disabledSubmit}
        >
          Volgende stap
        </StyledButton>
      </div>
    </form>
  );
};
