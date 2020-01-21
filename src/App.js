import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  MuiThemeProvider,
  CssBaseline,
  createMuiTheme,
  withWidth
} from "@material-ui/core";
import store from "./store";
import { grey } from "@material-ui/core/colors";
import { Home, Gratitude } from "./components";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xl: 1920,
      lg: 1204,
      md: 960,
      sm: 600,
      xs: 0
    }
  },
  palette: {
    primary: {
      light:
        "linear-gradient(rgba(243,240,239,0.5), rgba(243,240,239,0.5)), linear-gradient(#FFFFFF, #FFFFFF) !important",
      main: grey[300]
    },
    secondary: {
      main: "#58B998",
      light:
        "linear-gradient(rgba(88,185,152,0.4), rgba(88,185,152,0.4)), linear-gradient(#FFFFFF, #FFFFFF)"
    },
    background: {
      default: grey[200]
    }
  },
  "@global": {
    "html, body, #root": {
      width: "100%"
    }
  },
  typography: {
    fontFamily: [
      "DINOT",
      "DINPro",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    fontSize: 15,
    lineHeight: "24px"
  }
});

export default withWidth()(() => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/gratitude"
                exact
                component={() => <Gratitude step={2} />}
              />
              <Route
                path="/gratitude_step3"
                exact
                component={() => <Gratitude step={3} />}
              />
            </Switch>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
});
