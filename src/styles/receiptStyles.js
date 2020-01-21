import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    height: "100vh",
    overflow: "auto",
    width: "105%",
    paddingLeft: 30,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      top: 0,
      zIndex: 1,
      paddingLeft: 0
    }
  },
  container: {
    background: "white",
    width: 270,
    minWidth: 270,
    display: "flex",
    flexDirection: "column",
    "&>div:first-child": {
      lineHeight: "26px",
      fontSize: 30,
      fontWeight: "normal",
      fontFamily: "DINOT-Bold",
      letterSpacing: "-1px",
      paddingBottom: 29,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: 7,
        fontSize: 23,
        lineHeight: "29px",
        width: 200,
        paddingBottom: 53
      }
    },
    "&>div:nth-child(2)": {
      fontWeight: "normal",
      textDecoration: "underline",
      color: theme.palette.secondary.main,
      fontFamily: "DINOT-Bold",
      fontSize: 13,
      lineHeight: "20px",
      height: 23,
      marginBottom: 21,
      cursor: "pointer",
      position: "relative",
      "&>div": {
        boxSizing: "border-box",
        height: 10,
        width: 10,
        borderLeft: "2px solid #000000",
        borderBottom: "2px solid #000000",
        position: "absolute"
      },
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        height: 40,
        minHeight: 40,
        width: 40,
        color: "white",
        background: "#468774",
        borderRadius: "50%",
        margin: 0,
        top: 28,
        right: 22,
        boxShadow: "0 2px 10px 0 rgba(70,135,116,0.3)",
        "&>svg": {
          transform: "rotate(45deg) scale(1.1)",
          position: "absolute",
          top: 7,
          left: 7
        }
      }
    }
  },
  arrowDown: {
    top: 3,
    left: 87,
    transform: "rotate(315deg)"
  },
  arrowUp: {
    top: 10,
    left: 87,
    transform: "rotate(495deg)"
  },
  maximizedContainer: {
    padding: "37px 13px 29px 20px",
    height: "auto",
    maxHeight: "1117",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: "100vh",

      width: "100%",
      padding: "39px 15px 26px 15px"
    }
  },
  minimizedContainer: {
    minHeight: 347,
    padding: "37px 20px 27px 20px"
  },
  minWrapper: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 38
  },
  minDataWrapper: {
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    lineHeight: "20px",
    "&>div": {
      width: 142,
      height: 20,
      textOverflow: "ellipsis",
      overflow: "hidden"
    },
    "&>div:first-child": {
      fontFamily: "DINOT-Bold"
    }
  },
  minPriceWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",

    "&>div:first-child": {
      fontSize: 24,
      lineHeight: "22px",
      letterSpacing: "-1px",
      textAlign: "left"
    },
    "&>div:last-child": {
      fontSize: 10,
      lineHeight: "16px",
      textAlign: "left"
    }
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "flex-end",
    flexGrow: 1
  },
  button: {
    height: "60px !important",
    width: "230px !important",
    minHeight: "60px !important",
    minWidth: "230px !important",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      minWidth: "100% !important",
      fontSize: "21 !important",
      fontWeight: "normal"
    }
  },
  buttonDisabled: {
    color: "white !important",
    background: "#E0D9D7 !important",
    borderColor: "#E0D9D7 !important"
  },
  maximizedContainer_block2: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 15,
    lineHeight: "20px",
    paddingBottom: 30.5,
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    "&>div": {
      display: "flex",
      flexDirection: "column"
    },
    "&>div>span": {
      minHeight: 20
    },
    "&>div:first-child": {
      maxWidth: 170,
      textOverflow: "ellipsis",
      overflow: "hidden",
      "&>span:first- child": {
        fontFamily: "DINOT-Bold"
      }
    },
    [theme.breakpoints.down("sm")]: {
      borderBottom: "none",
      width: "auto",
      marginLeft: 7,
      marginRight: 7,
      paddingBottom: 18,
      fontSize: 13,
      lineHeight: "17px",
      "&>div>span": {
        height: 17
      },
      "&>div>span:first-child": {
        fontFamily: "DINOT-Bold"
      }
    }
  },
  maximizedContainer_block3: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 27.5,
    paddingBottom: 26,
    fontFamily: "DINOT-Bold",
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
      borderBottom: "none",
      width: "auto",
      marginLeft: 7,
      marginRight: 7,
      paddingBottom: 29.5,
      paddingTop: 20,
      fontSize: 13,
      lineHeight: "17px"
    }
  },
  maximizedContainer_block4: {
    color: "#000000",
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingBottom: 29.5,
    "&>div:first-child": {
      fontSize: 15,
      lineHeight: "20px",
      fontFamily: "DINOT-Bold",
      letterSpacing: -0.5
    },
    "&>div:last-child": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      textAlign: "right",
      "&>span:first-child": {
        fontFamily: "DINOT-Bold",
        fontSize: 24,
        lineHeight: "22px",
        paddingTop: 3,
        letterSpacing: -1
      },
      "&>span:last-child": {
        fontSize: 10,
        lineHeight: "16px"
      }
    },
    [theme.breakpoints.down("sm")]: {
      borderBottom: "none",
      width: "auto",
      marginLeft: 7,
      marginRight: 11,
      paddingTop: 23.5,
      paddingBottom: 22.5,
      "&>div:first-child": {
        fontSize: 13,
        lineHeight: "17px",
        paddingTop: 4
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
  maximizedContainer_block5: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingBottom: 24,
    fontSize: 15,
    fontFamily: "DINOT-Bold",
    color: theme.palette.secondary.main,
    lineHeight: "20px",
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    "&>div:first-child": {
      width: 178,
      textOverflow: "ellipsis",
      overflow: "hidden"
    },
    "&>div:last-child": {
      lineHeight: "24px",
      display: "flex",
      alignItems: "flex-end"
    },
    [theme.breakpoints.down("sm")]: {
      borderBottom: "none",
      width: "auto",
      marginLeft: 7,
      marginRight: 7,
      paddingTop: 28.5,
      paddingBottom: 27,
      fontSize: 13,
      lineHeight: "17px",
      "&>div:first-child": {
        width: 242
      },
      "&>div:last-child": {
        lineHeight: "17px"
      }
    }
  },
  maximizedContainer_block6: {
    paddingTop: 20,
    paddingBottom: 26,
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    fontSize: 15,
    lineHeight: "20px",
    fontFamily: "DINOT-Bold",
    justifyContent: "space-between",
    "&>div": {
      display: "flex",
      flexDirection: "column"
    },
    "&>div:first-child": {
      width: 186,
      textOverflow: "ellipsis",
      overflow: "hidden"
    },
    "& span": {
      height: 20
    },
    [theme.breakpoints.down("sm")]: {
      borderBottom: "none",
      width: "auto",
      marginLeft: 7,
      marginRight: 6,
      paddingTop: 28,
      paddingBottom: 24.5,
      fontSize: 13,
      lineHeight: "20px"
    }
  },
  maximizedContainer_block6line2: {
    fontFamily: "DINOT"
  },
  maximizedContainer_block6line3: {
    fontFamily: "DINOT"
  },
  maximizedContainer_block6line4: {
    color: theme.palette.secondary.main
  },
  maximizedContainer_block6line4end: {
    marginLeft: -10
  },
  maximizedContainer_block7: {
    paddingTop: 30,
    paddingBottom: 30,
    display: "flex",
    justifyContent: "space-between",
    fontSize: 15,
    lineHeight: "24px",
    fontFamily: "DINOT-Bold",
    color: theme.palette.secondary.main,
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    [theme.breakpoints.down("sm")]: {
      borderBottom: "none",
      width: "auto",
      marginLeft: 7,
      marginRight: 7,
      paddingTop: 29.5,
      paddingBottom: 25.5,
      fontSize: 13,
      lineHeight: "20px"
    }
  },
  maximizedContainer_block8: {
    paddingTop: 30,
    paddingBottom: 30,
    borderBottom: "1px solid rgba(151, 151, 151, 0.5)",
    fontFamily: "DINOT-Bold",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      borderBottom: "none",
      width: "auto",
      marginLeft: 7,
      marginRight: 7,
      paddingTop: 25.5,
      paddingBottom: 24.5,
      fontSize: 13,
      lineHeight: "20px"
    }
  },
  maximizedContainer_block9: {
    paddingTop: 30,
    paddingBottom: 34,
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    lineHeight: "20px",
    "&>span:last-child": { fontFamily: "DINOT-Bold" },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginLeft: 7,
      marginRight: 11,
      paddingTop: 29.5,
      paddingBottom: 26,
      fontSize: 13,
      "&>span:first-child": { fontFamily: "DINOT-Bold", lineHeight: "20px" },
      "&>span:last-child": { fontFamily: "DINOT", lineHeight: "17px" }
    }
  },

  maximizedContainer_block10: {
    paddingRight: 7,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0
    }
  },

  mobileMaximizedBorder: {
    width: "auto%",
    marginLeft: 7,
    marginRight: 11,
    borderTop: "1px solid rgba(151, 151, 151, 0.5)"
  },

  minimizedMobContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    height: 70,
    width: "100%",
    borderRadius: "2px 2px 0 0",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 6px 10px 0 rgba(24, 90, 71, 0.1)",
    padding: "13px 90px 15px 72px",
    display: "flex",
    justifyContent: "space-between",
    positon: "relative",
    flexWrap: "wrap",
    zIndex: 1,

    "&>div:first-child": {
      position: "absolute",
      top: 15,
      left: 15,
      width: 40,
      height: 40,
      "&>div": {
        position: "absolute",
        boxSizing: "border-box",
        height: 10,
        width: 10,
        borderLeft: "2px solid #000000",
        borderBottom: "2px solid #000000",
        transform: "rotate(495deg)",
        top: 17,
        left: 15
      }
    },
    "&>div:nth-child(2)": {
      display: "flex",
      flexDirection: "column",
      lineHeight: "20px",
      fontSize: 13,
      paddingTop: 2,
      width: "calc(100% - 51px)",
      "&>div": {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%"
      },
      "&>div:first-child": {
        fontFamily: "DINOT-Bold"
      }
    },
    "&>div:nth-child(3)": {
      display: "flex",
      flexDirection: "column",
      paddingTop: 1,
      textAlign: "end",
      "&>div:first-child": {
        fontFamily: "DINOT-Bold",
        fontSize: 17,
        lineHeight: "23px",
        letterSpacing: "-1px",
        paddingBottom: 4
      },
      "&>div:last-child": {
        fontSize: 8,
        lineHeight: "14px",
        opacity: 0.5
      }
    },
    "&>div:last-child": {
      position: "absolute",
      top: 15,
      right: 30,
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#468774",
      boxShadow: "0 2px 10px 0 rgba(70, 135, 116, 0.3)",
      "&>div": {
        boxSizing: "border-box",
        height: 10,
        width: 10,
        borderLeft: "2px solid #FFFFFF",
        borderBottom: "2px solid #FFFFFF",
        transform: "rotate(225deg)",
        position: "absolute",
        top: 15,
        left: 13
      }
    }
  }
}));

export default useStyles;
