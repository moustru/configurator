import { Color } from "../../theme/theme";
import styled from "styled-components";

export const SidebarView = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #171717;
`;

export const Button = styled.button<{ $active: boolean; $isDark: boolean }>`
  width: 100%;
  background: ${(props) => (props.$active ? Color.GREY : "transparent")};
  padding: 22px 42px 31px 33px;
  border: none;
  color: ${(props) =>
    props.$isDark || props.$active ? Color.WHITE : Color.BLACK};
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
    height: 100%;
  }
`;
