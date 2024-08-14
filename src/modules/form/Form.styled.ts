/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const FormView = styled.form<{ $isFormExpanded: boolean }>`
  background: ${(props) => props.theme.colors.grey};
  min-width: 377px;
  max-width: 377px;
  height: 100%;
  padding: 2%;
  position: relative;
  z-index: 0;
  min-height: 370px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    order: -2;
    width: 100%;
    max-width: 100%;
    min-width: auto;
    ${(props) =>
      props.$isFormExpanded
        ? "height: 100%; min-height: 370px;"
        : "height: auto; min-height: auto;"};
  }
`;

export const StyleFormControl = styled(FormControl)<{ $fullHeight: boolean }>`
  ${(props) => (props.$fullHeight ? "height: 100%" : "")};

  & > label {
    left: -15px !important;
    color: rgba(224, 224, 224, 0.5) !important;
  }

  & > div {
    color: rgba(224, 224, 224, 0.5) !important;
  }
`;

export const StyledTypography = styled(Typography)`
  color: rgba(224, 224, 224, 0.5) !important;
`;

export const ColorDiv = styled.div<{ color: string }>`
  width: 76px;
  height: 26px;
  background: ${(props) => props.color};
  border: 1px solid #c4c4c4;
`;

export const SliderTitle = styled.div`
  font-size: 20px;
  color: rgba(224, 224, 224, 0.5);
  margin-bottom: 24px;

  span {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const Marks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.white};
`;

export const ItemsWithColor = styled(MenuItem)`
  && {
    display: flex;
    justify-content: space-between;
    background: inherit;
    color: inherit;
  }
`;

export const SelectWithColor = styled(Select)<any>`
  & > div {
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.colors.white};
  }

  & > svg {
    color: ${(props) => props.theme.colors.blue};
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Arrow = styled(KeyboardArrowDownIcon)<{ $isOpen: boolean }>`
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.1s linear;
  color: ${(props) => props.theme.colors.white};
`;

export const FilterTitle = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

export const SizeWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 20px 0;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 65%;
  }

  & * {
    touch-action: none;
  }

  & > .rc-slider-vertical .rc-slider-mark {
    left: 0;
    visibility: hidden;
  }
`;

export const TileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const TileOption = styled.div.attrs<{ $value: number | undefined }>(
  (props) => ({
    style: {
      height: `${props.$value}%`,
      maxHeight: `${props.$value}%`,
    },
  })
)<{ $value: number | undefined }>`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  background: #b3b3b3;
  border: none;
  border-radius: 4px;
`;

export const T = styled.div`
  width: 100%;
  display: flex;
  padding: 6px 10px;
  font-family: IBM Plex Sans, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
  align-items: center;
  & > * {
    font-size: 14px !important;
    min-width: 0;
    min-height: 0;
  }

  & > span {
    flex: 1 1 0;
  }

  & svg {
    cursor: pointer;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 12px;
    padding: 0 10px;
  }
`;

export const PreviewTile = styled.img`
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
`;

export const PreviewTileDiv = styled.div`
  max-height: 100%;
  height: 100%;
  margin: 0 10px;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const DivFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button<{ $marginTop: boolean }>`
  background: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  font-family: IBM Plex Sans, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  width: 100%;
  height: 40px;
  padding: 10px 24px;
  border: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.$marginTop ? "margin-top: 15px;" : "")};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 12px;
    height: 30px;
  }
`;

export const ChooseColor = styled.div`
  position: absolute;
  width: 100%;
  height: 700px;
  background: ${(props) => props.theme.colors.grey};
  top: 0;
  z-index: 1;
  left: 0;
  padding: 5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  & > *:not(:last-child) {
    margin-bottom: 25px;
  }
`;

export const ColorTile = styled.div`
  cursor: pointer;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  & button {
    cursor: pointer;
  }
  & > div {
    max-height: 150px;
    //height: 100%;
  }
`;

export const Background = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const Paragraph = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`;

export const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 541px;
  height: 100%;
`;

export const Download = styled.button`
  margin-right: 40px;
  cursor: pointer;
  display: inline;
  background: none;
  border: none;
  color: inherit;
  text-transform: uppercase;
`;
