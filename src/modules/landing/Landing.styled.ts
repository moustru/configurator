import styled from "styled-components";

interface IProps {
  $isDark: boolean;
}

export const LandingView = styled.div<IProps>`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.$isDark ? props.theme.colors.black : props.theme.colors.white};
  padding: 32px 0px 0px 32px;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 32px 27px 0px 32px;
    flex-direction: column;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    order: -1;
    justify-content: space-evenly;
    padding: 25px 25px;
  }
`;
