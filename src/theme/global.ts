import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<{ $isDark: boolean }>`
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    line-height: 23px;
  },
    *::before,
    *::after {
    box-sizing: border-box;
  }

  html, body {
    background: ${(props) =>
      props.$isDark ? props.theme.colors.black : props.theme.colors.white};
    min-width: 280px;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    height: 100%;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  aside {
    background: ${(props) =>
      props.$isDark ? props.theme.colors.black : props.theme.colors.white}
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    margin: 0 auto;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .MuiFormControlLabel-root {
    margin-right: 0px !important;
  }

  .MuiList-root.MuiMenu-list {
    background: ${(props) =>
      props.$isDark ? "#4D4340" : props.theme.colors.white};
    color: ${(props) =>
      props.$isDark ? props.theme.colors.white : props.theme.colors.black};
  }

  #print {
    display: none;
  }
`;

export default GlobalStyle;
