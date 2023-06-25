import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../fonts/fonts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0044ff"
    },
    background: {
      default: "#FFF"
    },
    secondary: {
      main: "#0066ff"
    }
  },
  typography: {
    fontFamily: ["Nunito-Light"],
    fontSize: 14,
    "@media(max-width : 850px )": {
      fontSize: 8
    },
    h1: {
      fontFamily: ["Nunito-Medium"],
      color: "#085A8C",
      fontSize: 35
    },
    h2: {
      fontFamily: ["Nunito-Light"],
      fontSize: 26,
      color: "#085A8C"
    },
    h3: {
      fontFamily: ["Nunito-Light"],
      fontSize: 20,

      color: "#085A8C"
    },
    h4: {
      fontFamily: ["Nunito-Light"],
      fontSize: 18
    },
    h5: {
      fontFamily: ["Nunito-Light"],
      fontSize: 16,
      color: "#085A8C"
    },
    p: {
      fontFamily: ["Nunito-Light"],
      fontSize: 10
    },
    button: {
      fontSize: 12,
      "@media(max-width : 1300px )": {
        fontSize: 11
      },
      "@media(max-width : 510px )": {
        Maxwidth: "2p x",
        fontSize: 10,
        color: "green"
      }
    }
  }
});

export function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
