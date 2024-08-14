import styled from "styled-components";

export const FormView = styled.form<{ $isFormExpanded: boolean }>`
  background: #010504;
  min-width: 377px;
  max-width: 377px;
  height: 100%;
  padding: 2%;
  position: relative;
  z-index: 0;
  min-height: 370px;
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
    color: #fff;
  }
`;

export const Marks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
`;

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterTitle = styled.div`
  color: #fff;
`;

export const SizeWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 20px 0;

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

export const Paragraph = styled.p`
  text-align: center;
  color: #fff;
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
