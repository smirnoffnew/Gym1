import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    lineHeight: "18px"
  },
  title: {
    marginTop: 100,
    marginBottom: 61,
    "&>h1": {
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 44,
      lineHeight: "53px",
      height: 44,
      marginBottom: 10
    },
    [theme.breakpoints.down("sm")]: {
      margin: "30px 20px",
      "&>h1": {
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 25,
        lineHeight: "31px",
        height: "auto",
        marginTop: 0,
        marginBottom: 8
      },
      "&>span": {
        fontSize: 13,
        lineHeight: "20px"
      }
    }
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  card: {
    background: "white",
    padding: "39px 60px 53px 70px",
    marginBottom: 43,
    borderRadius: 2,
    [theme.breakpoints.down("sm")]: {
      padding: "19px 23px 30px 19px",
      margin: "0px 15px 30px 15px"
    }
  },
  line1: {
    display: "flex",
    justifyContent: "space-between",
    "&>span:first-child": {
      fontWeight: "bold",
      lineHeight: "24px",
      [theme.breakpoints.down("sm")]: {
        fontWeight: "normal",
        fontSize: 13,
        lineHeight: "20px"
      }
    },
    "&>span:last-child": {
      fontWeight: "bold",
      textDecoration: "underline",
      color: theme.palette.secondary.main,
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        fontSize: 13,
        paddingTop: 3,
        lineHeight: "20px"
      }
    }
  },
  line2: {
    marginBottom: 17,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 11,
      fontWeight: "bold",
      fontSize: 13,
      lineHeight: "20px"
    }
  },
  dataWrapper: {
    display: "flex",
    "&>div": {
      display: "flex",
      flexDirection: "column",
      "&>span:first-child": {
        fontSize: 10,
        lineHeight: "16px",
        opacity: 0.5
      }
    },
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      "&>div": {
        display: "flex",
        flexDirection: "column",
        "&>span:first-child": {
          fontSize: "11px !important",
          lineHeight: "18px !important"
        },
        "&>span:last-child": {
          fontSize: 13,
          lineHeight: "20px"
        }
      }
    }
  },
  line3: {
    marginBottom: 21,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 8
    }
  },
  dateOfBirth: {
    "&>span:first-child": {
      paddingRight: 75
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%"
    }
  },
  postcode: {
    "&>span:first-child": {
      paddingRight: 65
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      paddingBottom: 13
    }
  },
  address: {
    "& p": {
      margin: 0
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  telephone: {
    "&>span:first-child": {
      paddingRight: 72
    }
  },

  card2: {
    padding: "47px 70px 59px 70px",
    background: "white",
    boxShadow: "-2px 2px 15px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: "39px 15px 22px 15px"
    }
  },

  card2block1: {
    display: "flex",
    justifyContent: "space-between",

    "&>span:first-child": {
      fontWeight: "bold",
      fontSize: 30,
      lineHeight: "26px",
      marginBottom: 39,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 7,
        fontSize: 23,
        lineHeight: "29px",
        marginBottom: 43
      }
    },
    "&>span:last-child": {
      textDecoration: "underline",
      fontWeight: "bold",
      color: theme.palette.secondary.main,
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    }
  },

  card2block2: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 15,
    lineHeight: "20px",
    paddingBottom: 26.5,
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    "&>div": {
      display: "flex",
      flexDirection: "column"
    },
    "&>div>span": {
      height: 20
    },
    "&>div:first-child>span:first-child": {
      fontWeight: "bold"
    },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      paddingBottom: 23,
      fontSize: 13,
      lineHeight: "17px",
      paddingTop: 0,
      marginLeft: 7,
      marginRight: 7
    }
  },

  card2block3: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 23.5,
    paddingBottom: 29.5,
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: "20px",
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    "&>span": {
      color: theme.palette.secondary.main
    },
    "&>span:first-child": {
      color: "#000000"
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 29,
      paddingBottom: 35.5,
      marginLeft: 7,
      marginRight: 7,
      fontSize: 13,
      lineHeight: "17px"
    }
  },

  card2block4: {
    color: "#000000",
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20.75,
    paddingBottom: 29,
    "&>div:first-child": {
      fontSize: 15,
      lineHeight: "20px",
      fontWeight: "bold"
    },
    "&>div:last-child": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      textAlign: "right",
      "&>span:first-child": {
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "22px"
      },
      "&>span:last-child": {
        fontSize: 10,
        lineHeight: "16px"
      }
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 21.5,
      paddingBottom: 27.5,
      marginLeft: 7,
      marginRight: 11,
      "&>div:first-child": {
        fontSize: 13,
        lineHeight: "17px"
      },
      "&>div:last-child": {
        "&>span:first-child": {
          fontSize: 23,
          lineHeight: "29px"
        },
        "&>span:last-child": {
          fontSize: 10,
          lineHeight: "12px",
          opacity: 0.5
        }
      }
    }
  },

  card2block5: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingBottom: 24,
    fontSize: 15,
    lineHeight: "24px",
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    "&>div:first-child": {
      color: theme.palette.secondary.main,
      fontWeight: "bold"
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 28.5,
      paddingBottom: 27,
      marginLeft: 7,
      marginRight: 7,
      fontSize: 13,
      lineHeight: "17px",
      "&>div:last-child": {
        color: theme.palette.secondary.main,
        fontWeight: "bold",
        minWidth: 80,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }
    }
  },

  card2block6: {
    paddingTop: 20,
    paddingBottom: 29,
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    fontSize: 15,
    lineHeight: "20px",
    fontWeight: "bold",
    justifyContent: "space-between",
    "&>div": {
      display: "flex",
      flexDirection: "column"
    },
    "& span": {
      height: 20
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 28.5,
      paddingBottom: 24.5,
      marginLeft: 7,
      marginRight: 6,
      fontSize: 13,
      lineHeight: "20px"
    }
  },
  card2block6line2: {
    fontWeight: "normal"
  },
  card2block6line3: {
    fontWeight: "normal"
  },
  card2block6line4: {
    color: theme.palette.secondary.main
  },
  card2block6line4end: {
    marginLeft: -10
  },

  card2block7: {
    paddingTop: 23,
    paddingBottom: 29,
    display: "flex",
    justifyContent: "space-between",
    fontSize: 15,
    lineHeight: "24px",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 29.5,
      paddingBottom: 25.5,
      marginLeft: 7,
      marginRight: 7,
      fontSize: 13,
      lineHeight: "20px"
    }
  },

  card2block8: {
    paddingTop: 23,
    paddingBottom: 29,
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      paddingTop: 25.5,
      paddingBottom: 24.5,
      marginLeft: 7,
      marginRight: 7,
      fontSize: 13,
      lineHeight: "20px"
    }
  },

  card2block9: {
    paddingTop: 21,
    paddingBottom: 62,
    display: "flex",
    "&>span:last-child": { fontWeight: "bold" },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
      paddingTop: 29.5,
      paddingBottom: 25,
      marginLeft: 7,
      marginRight: 11,
      fontSize: 13,
      lineHeight: "20px",
      "&>span:first-child": { fontWeight: "bold" },
      "&>span:last-child": {
        fontWeight: "normal",
        lineHeight: "17px"
      }
    }
  },

  card2block10: {
    display: "flex",
    justifyContent: "flex-end",
    "&>a": {
      textDecoration: "none"
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      "&>a": {
        width: "100%",
        maxWidth: 345,
        height: 60
      }
    }
  },

  button: {
    margin: "0 !important",
    padding: "0 !important",
    borderRadius: 2,
    boxShadow: "0 2px 10px rgba(70,135,116,0.3)",
    width: 230,
    height: "60px !important",
    maxHeight: "60px !important",
    minHeight: "60px !important",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
}));

export default useStyles;
