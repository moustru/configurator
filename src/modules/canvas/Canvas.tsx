/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useState, useRef, useEffect } from "react";
import { useSelector } from "../../redux";
import ScrollContainer from "react-indiana-drag-scroll";
import useWindowSize from "../../hooks/useWindowSize";
import * as S from "./Canvas.styled";
import { CircularProgress } from "@mui/material";
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
import { ActionIcon, rem, Switch } from "@mantine/core";
import { IconZoomIn, IconZoomOut } from "@tabler/icons-react";

let toInit = false;

const Canvas: FC<{ hidden: boolean }> = ({ hidden }) => {
  const { isDark } = useSelector((state) => state.theme);
  const [twoDimensional, setTwoDimensional] = useState<boolean>(true);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
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

  /** onZOOM */
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(220, 100);
    }
  }, [isZoomed]);

  /** onChange */
  useEffect(() => {
    setLoading(true);
    generateImageFromHTML().then((img) => {
      setImage(img);
    });
  }, [buttonPanel, buttonTile, panel, tile.size, tile[tile.size]]);

  useEffect(() => {
    if (
      tileCanvasRef.current === null ||
      panelCanvasRef.current === null ||
      height === 0
    )
      return;
    if (hidden) {
      toInit = true;
      return;
    }
    initTileCanvas(tileCanvasRef.current);
    initPanelCanvas(panelCanvasRef.current);
  }, [height, width]);

  useEffect(() => {
    if (toInit && !hidden) {
      // @ts-expect-error
      initTileCanvas(tileCanvasRef.current);
      //@ts-ignore
      initPanelCanvas(panelCanvasRef.current);
      toInit = false;
    }
  }, [hidden]);

  useEffect(() => {
    /** 2D */
    if (tileCanvasRef.current === null || hidden || !twoDimensional) return;
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
  }, [height, width, hidden, tile.size, tile[tile.size], twoDimensional]);

  useEffect(() => {
    /** 2D */
    if (panelCanvasRef.current === null || hidden || !twoDimensional) return;
    setPanelCallbackTimed(function () {
      updatePanelCanvas(
        panel,
        0.25,
        panelCanvasCtx,
        panelCanvasWidth,
        panelCanvasHeight
      );
    });
  }, [height, width, hidden, panel, twoDimensional]);

  return (
    <S.CanvasWrapper $isDark={isDark} $hidden={hidden}>
      <S.Viewer2D $open={twoDimensional}>
        <S.Canvas ref={tileCanvasRef} $isVisible={buttonTile} />
        <S.Canvas ref={panelCanvasRef} $isVisible={buttonPanel} />
      </S.Viewer2D>

      <S.Viewer3D $open={!twoDimensional}>
        <S.RenderHouseWrapper>
          {loading && <CircularProgress style={{ position: "absolute" }} />}

          <ScrollContainer
            className="container"
            innerRef={scrollContainerRef}
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <S.RenderImage
              ref={imageRef}
              $isZoomed={isZoomed}
              src={image}
              alt={"3D-image"}
            />
          </ScrollContainer>
        </S.RenderHouseWrapper>
      </S.Viewer3D>

      <IconZoomOut />

      {!twoDimensional && (
        <ActionIcon
          onClick={() => setIsZoomed(!isZoomed)}
          pos="absolute"
          top="24px"
          right="14%"
          w={rem(48)}
          h={rem(48)}
        >
          {isZoomed ? (
            <IconZoomOut
              style={{ width: "80%", height: "80%", color: "white.0" }}
              stroke={1.5}
            />
          ) : (
            <IconZoomIn style={{ width: "80%", height: "80%" }} stroke={1.5} />
          )}
        </ActionIcon>
      )}

      <Switch
        size="xl"
        onLabel="3D"
        offLabel="2D"
        color="blue.0"
        checked={!twoDimensional}
        pos="absolute"
        bottom={rem(16)}
        right={rem(16)}
        onChange={(event) => setTwoDimensional(!event.currentTarget.checked)}
      />
    </S.CanvasWrapper>
  );
};

export default Canvas;
