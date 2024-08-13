/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useRef, useEffect, useState } from "react";
import { useSelector } from "../../redux";
import house from "../../assets/house.png";
import * as S from "./Canvas.styled";
import useWindowSize from "../../hooks/useWindowSize";
import {
  initPanelCanvasPDF,
  initTileCanvasPDF,
  initTilePresetPDF,
  setPanelCallbackTimedPDF,
  setTileCallbackTimedPDF,
  updatePanelCanvasPDF,
  updateTileCanvasPDF,
} from "./DrawPDF";

let toInit = false;
let toInit3D = true;

const hidden = false;
const twoDimensional = false;
const isDark = false;

const CanvasPDF: FC = () => {
  const {
    windowSize: { height, width },
  } = useWindowSize();

  const { tile, panel, buttonPanel, buttonTile } = useSelector(
    (state) => state.sidebar
  );

  const tileCanvasPDFRef = useRef<HTMLCanvasElement>(null);
  const panelCanvasPDFRef = useRef<HTMLCanvasElement>(null);
  const renderPDFRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parametersCSS3DTransform, setParametersCSS3DTransform] = useState<any>(
    {
      perspective: "1450px",
      perspectiveOrigin: "0% 72%",
      transformCube:
        "scale3d(1, 1, 1) rotateX(0deg) rotateY(19.38deg) rotateZ(0deg) translate3d(417px, 262px, 0px) skew(0deg, 0deg)",
      transformLeft:
        "scale3d(1, 1, 1) rotateX(0deg) rotateY(96deg)  rotateZ(0deg) translate3d(0px,0px,0px) skew(0deg,0deg)",
      transformFront:
        "scale3d(1.1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0px,0px,0px) skew(0deg,0deg)",
    }
  );

  useEffect(() => {
    const isTileSize71 = tile.size === 71;
    setParametersCSS3DTransform({
      perspective: "1450px",
      perspectiveOrigin: "0% 72%",
      transformCube:
        "scale3d(1, 1, 1) rotateX(0deg) rotateY(19.38deg) rotateZ(0deg) translate3d(416px, 262px, 0px) skew(0deg, 0deg)",
      transformLeft:
        buttonTile && isTileSize71
          ? "scale3d(1, 1, 1) rotateX(0deg) rotateY(96deg) rotateZ(0deg) translate3d(-.1px,-2px,0px) skew(0deg,0deg)"
          : "scale3d(1, 1, 1) rotateX(0deg) rotateY(96deg)  rotateZ(0deg) translate3d(-2px,0px,0px) skew(0deg,0deg)",
      transformFront:
        buttonTile && isTileSize71
          ? "scale3d(1,1,1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(-.2px,2px,0px) skew(0deg,0deg)"
          : "scale3d(1,1,1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate3d(0px,0px,0px) skew(0deg,0deg)",
    });
  }, [panel, buttonPanel, buttonTile, tile.size]);

  useEffect(() => {
    if (
      tileCanvasPDFRef.current === null ||
      panelCanvasPDFRef.current === null ||
      height === 0
    )
      return;
    if (hidden) {
      toInit = true;
      return;
    }
    initTileCanvasPDF(tileCanvasPDFRef.current);
    initPanelCanvasPDF(panelCanvasPDFRef.current);
  }, [height, width]);

  useEffect(() => {
    if (toInit && !hidden) {
      //@ts-ignore
      initTileCanvasPDF(tileCanvasPDFRef.current);
      //@ts-ignore
      initPanelCanvasPDF(panelCanvasPDFRef.current);
      toInit = false;
    }
  }, []);

  useEffect(() => {
    //@ts-ignore
    /** 3D */
    const renderDivPDF = renderPDFRef.current;
    if (renderDivPDF === null || hidden || twoDimensional) return; //@ts-ignore

    const renderHouseWrapperPDF = renderDivPDF.parentNode; //@ts-ignore
    const houseImgPDF = renderHouseWrapperPDF.lastChild; //@ts-ignore

    houseImgPDF.removeAttribute("style"); //@ts-ignore
    renderDivPDF.removeAttribute("style"); //@ts-ignore

    renderDivPDF.style.height =
      (houseImgPDF as HTMLElement).clientHeight + "px";
    renderDivPDF.style.width = (houseImgPDF as HTMLElement).clientWidth + "px";

    renderDivPDF.style.perspective = parametersCSS3DTransform.perspective;
    renderDivPDF.style.perspectiveOrigin =
      parametersCSS3DTransform.perspectiveOrigin;

    if (renderDivPDF.firstChild) {
      const firstChildHTMLElement = renderDivPDF.firstChild;
      (firstChildHTMLElement as HTMLElement).style.transform =
        parametersCSS3DTransform.transformCube;
    }
  }, [
    height,
    width,
    buttonTile,
    parametersCSS3DTransform.perspective,
    parametersCSS3DTransform.perspectiveOrigin,
    parametersCSS3DTransform.transformCube,
  ]);

  useEffect(() => {
    /** 3D */
    if (
      (buttonTile &&
        (tile[tile.size].length === 0 || tileCanvasPDFRef.current === null)) ||
      panelCanvasPDFRef.current === null ||
      renderPDFRef.current === null ||
      hidden ||
      twoDimensional
    )
      return;
    if (toInit3D) {
      initTilePresetPDF(1920 * 8, 1080 * 8);
      toInit3D = false;
    }
    // @ts-ignore
    const sides = renderPDFRef.current.firstChild.children;

    if (buttonTile) {
      let offset = 0;
      let height = 4;
      if (tile.size === 71) {
        offset = 1;
        height = 3;
      }
      setTileCallbackTimedPDF(() => {
        //@ts-ignore
        const isTileSize71 = tile.size === 71;
        updateTileCanvasPDF(
          tile[tile.size],
          height,
          offset,
          offset,
          sides[0].getContext("2d", { alpha: false }),
          sides[0].width,
          sides[0].height,
          isTileSize71
        );
        updateTileCanvasPDF(
          tile[tile.size],
          height,
          offset,
          offset,
          sides[1].getContext("2d", { alpha: false }),
          sides[1].width,
          sides[1].height,
          isTileSize71
        );
      });
    } else {
      setPanelCallbackTimedPDF(() => {
        //@ts-ignore
        updatePanelCanvasPDF(
          panel,
          0.04,
          sides[0].getContext("2d", { alpha: false }),
          sides[0].width,
          sides[0].height
        );
        updatePanelCanvasPDF(
          panel,
          0.04,
          sides[1].getContext("2d", { alpha: false }),
          sides[1].width,
          sides[1].height
        );
      });
    }
  }, [height, width, tile.size, panel, buttonTile, tile]);

  return (
    <S.CanvasWrapper $isDark={isDark} $hidden={hidden}>
      <S.Viewer2D $open={twoDimensional}>
        <S.Canvas ref={tileCanvasPDFRef} $isVisible={false} />
        <S.Canvas ref={panelCanvasPDFRef} $isVisible={false} />
      </S.Viewer2D>

      <S.Viewer3D $open={!twoDimensional}>
        <S.RenderHouseWrapper>
          <S.Render ref={renderPDFRef}>
            <S.Camera>
              <S.Left
                transform={parametersCSS3DTransform.transformLeft}
                width={230}
                height={550}
              />
              <S.Front
                transform={parametersCSS3DTransform.transformFront}
                width={1580}
                height={550}
              />
            </S.Camera>
          </S.Render>
          <S.HouseImg src={house} />
        </S.RenderHouseWrapper>
      </S.Viewer3D>
    </S.CanvasWrapper>
  );
};

export default CanvasPDF;
