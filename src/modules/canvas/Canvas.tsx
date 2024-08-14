/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef, useEffect } from "react";
import { useSelector } from "../../redux";
import ScrollContainer from "react-indiana-drag-scroll";
import useWindowSize from "../../hooks/useWindowSize";
import * as S from "./Canvas.styled";
import { generateImageFromHTML } from "../save/save3D";
import {
  initPanelCanvas,
  initTileCanvas,
  panelCanvasCtx,
  panelCanvasHeight,
  panelCanvasWidth,
  setPanelCallbackTimed,
  setTileCallbackTimed,
  tileCanvasCtx,
  tileCanvasHeight,
  tileCanvasWidth,
  updatePanelCanvas,
  updateTileCanvas,
} from "./Draw";
import { Loader, rem, Switch } from "@mantine/core";

let toInit = false;

const Canvas = () => {
  const [twoDimensional, setTwoDimensional] = useState<boolean>(true);
  const [image, setImage] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    windowSize: { height, width },
  } = useWindowSize();
  const { tile, panel, buttonPanel, buttonTile } = useSelector(
    (state) => state.sidebar
  );
  const tileCanvasRef = useRef<HTMLCanvasElement>(null);
  const panelCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /** onLoad image */
  useEffect(() => {
    generateImageFromHTML();
    setLoading(false);
  }, [image]);

  /** onChange */
  useEffect(() => {
    setLoading(true);
    generateImageFromHTML().then((img) => {
      setImage(img);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonPanel, buttonTile, panel, tile.size, tile[tile.size]]);

  useEffect(() => {
    if (
      tileCanvasRef.current === null ||
      panelCanvasRef.current === null ||
      height === 0
    )
      return;
    initTileCanvas(tileCanvasRef.current);
    initPanelCanvas(panelCanvasRef.current);
  }, [height, width]);

  useEffect(() => {
    if (toInit) {
      // @ts-expect-error
      initTileCanvas(tileCanvasRef.current);
      //@ts-ignore
      initPanelCanvas(panelCanvasRef.current);
      toInit = false;
    }
  });

  useEffect(() => {
    /** 2D */
    if (tileCanvasRef.current === null || !twoDimensional) return;
    let offset = 0;
    let height = 24; //when tile size = 85
    if (tile.size === 71) {
      offset = 2;
      height = 20;
    }
    setTileCallbackTimed(function () {
      //@ts-ignore
      const isTileSize71 = tile.size === 71;
      updateTileCanvas(
        tile[tile.size],
        height,
        offset,
        offset,
        tileCanvasCtx,
        tileCanvasWidth,
        tileCanvasHeight,
        isTileSize71
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width, tile.size, tile[tile.size], twoDimensional]);

  useEffect(() => {
    /** 2D */
    if (panelCanvasRef.current === null || !twoDimensional) return;
    setPanelCallbackTimed(function () {
      updatePanelCanvas(
        panel,
        0.25,
        panelCanvasCtx,
        panelCanvasWidth,
        panelCanvasHeight
      );
    });
  }, [height, width, panel, twoDimensional]);

  return (
    <S.CanvasWrapper>
      <S.Viewer2D $open={twoDimensional}>
        <S.Canvas ref={tileCanvasRef} $isVisible={buttonTile} />
        <S.Canvas ref={panelCanvasRef} $isVisible={buttonPanel} />
      </S.Viewer2D>

      <S.Viewer3D $open={!twoDimensional}>
        <S.RenderHouseWrapper>
          {loading && <Loader pos="absolute" />}

          <ScrollContainer
            className="container"
            innerRef={scrollContainerRef}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <S.RenderImage ref={imageRef} src={image} alt={"3D-image"} />
          </ScrollContainer>
        </S.RenderHouseWrapper>
      </S.Viewer3D>

      <Switch
        size="xl"
        onLabel="3D"
        offLabel="2D"
        color="blue.0"
        checked={!twoDimensional}
        pos="absolute"
        bottom={{ md: rem(16) }}
        top={{ xs: rem(16) }}
        right={rem(16)}
        onChange={(event) => setTwoDimensional(!event.currentTarget.checked)}
      />
    </S.CanvasWrapper>
  );
};

export default Canvas;
