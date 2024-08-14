/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, MouseEvent } from "react";
import { tileData, ITile } from "../../../static/tile";
import { useDispatch, useSelector } from "../../../redux";
import {
  setAddTile,
  tileSelected,
} from "../../../redux/slices/sliderbarReducer";
import { Button, Container, Flex, Image, rem, Stack } from "@mantine/core";

interface IProps {
  handleClose: () => void;
}

const ChooseColor: FC<IProps> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.sidebar.tile.size);

  const handleClickAdd = (
    event: MouseEvent<SVGSVGElement> | MouseEvent<HTMLElement>,
    tile: ITile
  ) => {
    event.stopPropagation();
    dispatch(setAddTile(tile));
    handleClose();
  };

  return (
    <Container
      pos="absolute"
      w="100%"
      h={{ xs: "auto", md: "700px" }}
      bg="grey.0"
      top={0}
      left={0}
      p="5%"
      style={{ zIndex: 1, overflowY: "auto" }}
    >
      <Button
        w="100%"
        mb={rem(24)}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        Закрыть
      </Button>
      <Flex wrap="wrap" gap=".5%">
        {
          // @ts-ignore
          tileData[size].map((tile) =>
            tileSelected[tile.id - 1] ? null : (
              <Flex
                w={{ xs: "33%", md: "100%" }}
                h={{ xs: "auto", md: rem(150) }}
                direction="column"
                justify="flex-end"
                align="center"
                style={{ cursor: "pointer" }}
                mb={rem(8)}
                key={tile.id}
                onClick={(event) => handleClickAdd(event, tile)}
              >
                <Stack maw="100%" mah="100%">
                  <Image src={tile.background} />
                </Stack>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, .5)",
                    width: "100%",
                    color: "#fff",
                    padding: "10px 0",
                    textAlign: "center",
                  }}
                >
                  {tile.title}
                </div>
              </Flex>
            )
          )
        }
      </Flex>
    </Container>
  );
};

export default ChooseColor;
