import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Manrope",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          userSelect: "none",
          padding: 0,
          margin: 0,
          lineHeight: 1.6,
          fontSize: "22px",
        },
        "@font-face": {
          fontFamily: "Manrope",
          src: `url("/fonts/manrope.ttf") format("truetype-variations");`,
          fontStyle: "normal",
          fontVariationSettings: "'wght' 500",
          fontVariationLigatures: "normal",
          fontWeight: "200 800",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});
