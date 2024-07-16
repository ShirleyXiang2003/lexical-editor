import { createTheme } from "@mui/material";

const font = "'Lexend', sans-serif";

const mediaQueryTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
    },
    secondary: {
      main: "#991503",
      contrastText: "white",
    },
    background: {
      default: "#e8dad8",
    },
    colors: {
      darkblue: "#750f01",
      lightgreen: "#9cbec6ff",
    },
  },
  typography: {
    fontFamily: font,
    h3: {
      [mediaQueryTheme.breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    h4: {
      [mediaQueryTheme.breakpoints.down("sm")]: {
        fontSize: "1.75rem",
      },
    },
  },
});

export default theme;
