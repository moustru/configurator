import { DefaultTheme } from "styled-components";

export enum Color {
  WHITE = "#FFFFFF",
  GREY = "#252323",
  BLACK = "#010504",
  BLUE = "#0e0eb1",
}

export enum Breakpoint {
  MOBILE_SE = "360px",
  MOBILE = "768px",
  TABLET = "1024px",
  DESKTOP = "1280px",
}

export enum Theme {
  WHITE = "WHITE",
  DARK = "DARK",
}

export const defaultTheme: DefaultTheme = {
  colors: {
    white: Color.WHITE,
    grey: Color.GREY,
    black: Color.BLACK,
    blue: Color.BLUE,
  },
  breakpoints: {
    mobileSE: Breakpoint.MOBILE_SE,
    mobile: Breakpoint.MOBILE,
    tablet: Breakpoint.TABLET,
    desktop: Breakpoint.DESKTOP,
  },
};
