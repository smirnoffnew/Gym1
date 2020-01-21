import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "&>div": {
      width: "100%",
      marginBottom: 30
    },
    "&>div:first-child": {
      marginBottom: 35
    },
    "&>div:last-child": {
      marginBottom: 85
    },
    [theme.breakpoints.down("sm")]: {
      "&>div": {
        marginBottom: 20
      },
      "&>div:first-child": {
        marginBottom: 15
      },
      "&>div:nth-child(4)": {
        marginBottom: 30
      },
      "&>div:last-child": {
        marginBottom: 0
      }
    }
  },

  wrapper: {
    width: 625,
    maxWidth: 625,
    display: "flex",
    flexDirection: "column",
    "&>div": {
      width: "100%",
      marginBottom: 15
    }
  },

  line1wrapper: {
    display: "flex",
    flexDirection: "column"
  },
  line1: {
    display: "flex",
    flexDirection: "row"
  },

  birthDateTitle: {
    lineHeight: "24px",
    paddingBottom: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      lineHeight: "20px"
    }
  },

  lineDefaultWrapper: {
    display: "flex",
    flexDirection: "column"
  },

  lineDefault: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    "&>div": {
      width: "50%"
    },
    "&>div:first-child": {
      marginRight: 15
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      "&>div": {
        width: "100%"
      },
      "&>div:nth-child(2)": {
        marginTop: 15
      }
    }
  },

  radioWraper: {
    height: 50,
    minWidth: 90,
    position: "relative",
    padding: "14px 19px 16px 44px",
    marginRight: theme.spacing(2),
    background: "white",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.05), #F3F0EF 0px -3px inset",
    "&:hover": {
      boxShadow: "-2px 2px 15px rgba(0,0,0,0.05), #58B998 0px -3px inset"
    }
  },
  errorInput: {
    border: "1px solid #FF001B !important",
    background:
      "linear-gradient(rgba(255,0,27,0.05), rgba(255,0,27,0.05)), linear-gradient(#FFFFFF, #FFFFFF) !important",
    boxShadow:
      "-2px 2px 15px rgba(0,0,0,0.05), #FF001B 0px -3px inset !important",
    "&:hover": {
      boxShadow:
        "-2px 2px 15px rgba(0,0,0,0.05), #FF001B 0px -3px inset !important"
    }
  },

  errorDateInput: {
    marginBottom: 10
  },

  radio: {
    position: "absolute",
    left: 4,
    transform: "scale(0.9)",
    "&>span:first-child>div>svg:first-child": {
      color: "#F3F0EF"
    },
    "&>span:first-child>div>svg:last-child": {
      transform: "scale(1.4)"
    },
    [theme.breakpoints.down("sm")]: {
      top: 1
    }
  },
  uncheckedRadio: {
    "&>span:first-child>div>svg:last-child": {
      color: "#F3F0EF",
      transform: "scale(1.7)"
    }
  },
  field: {
    height: 50,
    background: "white",
    borderRadius: 2,
    border: "none",
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.05), #F3F0EF 0px -3px inset",
    "&:hover": {
      boxShadow: "-2px 2px 15px rgba(0,0,0,0.05), #58B998 0px -3px inset"
    },
    "&>div": {
      height: 50
    },
    "& input": {
      border: "none",
      padding: "8px 15px 10px 15px",
      fontSize: 15,
      lineHeight: "24px",
      height: "24px !important",
      WebkitBoxShadow: "0 0 0 1000px white inset",
      "&::before": {
        border: "none"
      }
    },
    "& label": {
      top: 13,
      left: 10,
      transform: "none"
    }
  },

  selectWrapper: {
    "&>div": {
      width: 75,
      marginRight: 15,
      "&>svg": {
        display: "none"
      }
    },
    "&>div:nth-child(2)>div:first-child": {
      paddingRight: "15px !important"
    },

    "&>div:last-child": {
      width: 125,
      marginRight: 0
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0 !important",
      "&>div": {
        marginTop: "0 !important"
      },
      "&>div:first-child": {
        width: "75px !important"
      },
      "&>div:nth-child(2)": {
        width: "75px !important",
        "&>div:first-child": {
          paddingRight: "15px !important"
        }
      },
      "&>div:last-child": {
        width: "calc(100% - 180px) !important",
        maxWidth: "125px !important"
      }
    }
  },

  selectSmallDesignWrapper: {
    "&>div": {
      width: "100%",
      marginTop: "15px !important",
      "&>svg": {
        display: "none"
      }
    },
    "&>div:first-child": {
      marginTop: "0px !important"
    }
  },

  select: {
    height: 50,
    borderRadius: 2,
    "& > div": {
      padding: "25px 0px 0px 15px",
      fontSize: 15,
      lineHeight: "24px"
    }
  },

  addressSmallDesignWrapper: {
    display: "flex",
    flexDirection: "row !important",
    [theme.breakpoints.down("sm")]: {
      "&>div": {
        width: "145px !important",
        marginBottom: "0 !important"
      }
    }
  },

  placeholder: {
    color: "rgba(0, 0, 0, 0.33)"
  },

  address1wrapper: {
    width: "100%",
    display: "flex",
    "&>div:first-child": {
      marginRight: 15
    }
  },

  address2wrapper: {
    marginTop: 15,
    height: 70,
    cursor: "default",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: "24px",
    background:
      "linear-gradient(rgba(88,185,152,0.4), rgba(88,185,152,0.4)), linear-gradient(#FFFFFF, #FFFFFF) !important",
    padding: "11px 15px",
    "&>p": {
      padding: 0,
      margin: 0
    },
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.01)",
    "&:hover": {
      boxShadow: "-2px 2px 15px rgba(0,0,0,0.01)"
    }
  },

  conditionWrapper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 667,
    "&>div:nth-child(2)": {
      marginTop: 10
    }
  },

  conditionLine: {
    width: "100%",

    position: "relative",
    paddingLeft: 37,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 40,
      fontSize: 13,
      lineHeight: "20px"
    },
    "&>a": {
      fontWeight: "bold",
      textDecoration: "underline",
      color: "black",
      [theme.breakpoints.down("sm")]: {
        textDecoration: "none"
      }
    }
  },

  checkbox: {
    position: "absolute",
    top: -8,
    left: -12,

    "& path": {
      transform: "scale(1.45) translate(-4px, -4px) !important"
    },
    [theme.breakpoints.down("sm")]: {
      top: -9
    }
  },

  checked: {
    color: "#EEEEEE !important",

    "& svg": {
      background: "#58B998 !important",
      border: "1px solid #E0D9D7",
      transform: "scale(0.7)"
    }
  },
  unchecked: {
    color: "#BCBCBC",
    "& svg": {
      background: "#EEEEEE !important",
      transform: "scale(0.7)"
    }
  },

  buttonLine: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center"
    }
  },

  button: {
    width: 170,
    minHeight: "60px !important",
    height: "60px !important",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 345,
      width: "100%",
      fontSize: "21px !important"
    }
  },

  buttonDisabled: {
    color: "white !important",
    background: "#E0D9D7 !important",
    borderColor: "#E0D9D7 !important"
  },

  errorLine: {
    borderRadius: 2,
    background:
      "linear-gradient(rgba(255,0,27,0.05), rgba(255,0,27,0.05)), linear-gradient(white, white)",
    boxShadow: "-2px 2px 15px rgba(rgba(0,0,0,0.1)",
    cursor: "default",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "left",
    color: "#1D1D1B",
    padding: 15,
    minWidth: "auto"
  }
}));

export default useStyles;
