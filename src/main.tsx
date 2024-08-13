import App from "./App";
import { store } from "./redux";
import { Provider } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Color } from "./theme/theme";
import {
  createTheme as createMantineTheme,
  MantineProvider,
} from "@mantine/core";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./main.css";

const mantineTheme = createMantineTheme({
  colors: {
    white: [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ],
    black: [
      "#252323",
      "#252323",
      "#252323",
      "#252323",
      "#252323",
      "#252323",
      "#252323",
      "#252323",
      "#252323",
      "#252323",
    ],
    grey: [
      "#010504",
      "#010504",
      "#010504",
      "#010504",
      "#010504",
      "#010504",
      "#010504",
      "#010504",
      "#010504",
      "#010504",
    ],
    blue: [
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
      "#0e0eb1",
    ],
  },
  headings: {
    fontFamily: "Roboto, sans-serif",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: Color.BLUE,
    },
    secondary: {
      main: Color.GREY,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={mantineTheme}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </MantineProvider>
);
