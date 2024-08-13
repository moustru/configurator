import styled from "styled-components";

export const LayoutView = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 77px;
  background: ${(props) => props.theme.colors.white};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;
