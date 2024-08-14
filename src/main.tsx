import App from "./App";
import { store } from "./redux";
import { Provider } from "react-redux";

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
      "#2626bd",
      "#2626bd",
      "#2626bd",
      "#2626bd",
      "#2626bd",
      "#2626bd",
      "#2626bd",
      "#2626bd",
      "#2626bd",
      "#2626bd",
    ],
    green: [
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
      "#2e7b38",
    ],
  },
  headings: {
    fontFamily: "Roboto, sans-serif",
  },
  breakpoints: {
    xs: "20em",
  },
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={mantineTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>
);
