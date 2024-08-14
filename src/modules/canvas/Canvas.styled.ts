import styled from "styled-components";

export const CanvasWrapper = styled.div<{ $hidden: boolean }>`
  background: #fff;
  color: #fff;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.$hidden ? "none; visibility: hidden" : "flex")};
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    order: -1;
    justify-content: space-evenly;
  }
`;

export const Viewer2D = styled.div<{ $open: boolean }>`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  overflow: auto;
  ${(props) => (props.$open ? "" : "visibility: hidden;")}
`;

export const Canvas = styled.canvas<{ $isVisible: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  ${(props) => (props.$isVisible ? "" : "visibility: hidden;")}
  height: 100%;
  width: 100%;
  min-height: 350px;
  min-width: 350px;
`;

export const Viewer3D = styled.div<{ $open: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  display: flex;
  ${(props) => (props.$open ? "" : "visibility: hidden;")}
`;

export const HouseImg = styled.img<{ grabbed?: boolean }>`
  z-index: 1;
  width: 1920px;
  height: 1080px;
`;

export const RenderHouseWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export const RenderImage = styled.img<{ $isZoomed?: boolean }>`
  min-width: 1920px;
  min-height: 900px;
  max-width: 3840px;
  max-height: 2160px;
`;

export const Render = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  overflow: hidden;
`;

export const Camera = styled.div`
  transform-style: preserve-3d;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

export const Left = styled.canvas<{ transform: string }>`
  transform: ${(props) => props.transform};
  transform-origin: top left;

  position: absolute;
  pointer-events: auto;
  user-select: none;
  display: block;
`;

export const Front = styled.canvas<{
  $needBorder?: boolean;
  transform: string;
}>`
  transform: ${(props) => props.transform};
  transform-origin: top left;
  position: absolute;
  pointer-events: auto;
  user-select: none;
  display: block;
`;
