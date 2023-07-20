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
  breakpoints: {
    values: {
      xxs: 0,
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    fontFamily: ["Nunito-Light"],
    fontSize: 14,
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
      color: "#085A8C",
      "@media(max-width : 600px )": {
        fontSize: 8
      }
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
        fontSize: 10
      }
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          whiteSpace: "nowrap",
          overFlow: "hidden",
          textOverflow: "ellipsis",
          "@media(max-width : 400px)": {
            fontSize: 10
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#FFF",
          "@media(max-width : 600px)": {
            fontSize: 12
          }
        }
      }
    }
  }
});

export function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
