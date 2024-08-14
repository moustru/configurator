/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, MouseEvent } from "react";
import { useSelector, useDispatch } from "../../../redux";
import { ITile } from "../../../static/tile";
import { setSize, setRemoveTile } from "../../../redux/slices/sliderbarReducer";
import { Button, Flex, Image, rem, Select, Text } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";

interface IProps {
  handleClickChooseButton: (event: MouseEvent<HTMLButtonElement>) => void;
  hidden: boolean;
}

//@ts-ignore
function TileElement({
  tile,
  value,
}: {
  tile: ITile | undefined | any;
  value: number | undefined | any;
}) {
  const dispatch = useDispatch();

  const handleClickRemove = (event: MouseEvent<SVGSVGElement>, tile: ITile) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(setRemoveTile(tile));
  };
  return (
    <Flex
      w={{ base: "100%", xs: "32%", md: "100%" }}
      h={{ xs: "20%", md: rem(32) }}
      align="center"
      justify="space-between"
      direction={{ base: "row", xs: "column", md: "row" }}
      bg="#cbcbcb"
      mb={rem(8)}
      p={rem(8)}
      style={{
        borderRadius: rem(4),
      }}
    >
      <Text w={rem(100)} visibleFrom="md">
        {tile.title}
      </Text>
      <Text w="100%" visibleFrom="xs" hiddenFrom="md" size="sm">
        {tile.title}
      </Text>
      <Image src={tile.background} mah="100%" />
      <Flex
        w={{ xs: "100%", md: "auto" }}
        mt={{ xs: rem(10), md: 0 }}
        justify={{ xs: "space-between", md: "flex-start" }}
      >
        <Text visibleFrom="md">{value}%</Text>
        <Text visibleFrom="xs" hiddenFrom="md" size="sm">
          {value}%
        </Text>
        <IconX
          onClick={(event) => handleClickRemove(event, tile)}
          cursor="pointer"
        />
      </Flex>
    </Flex>
  );
}

const handleStyle = new Array(5).fill({
  backgroundColor: "#FF6720",
  border: "1px solid #FF6720",
  boxShadow: "none",
});
handleStyle.push({ display: "none" });

// @ts-ignore
const Tile: FC<IProps> = ({ handleClickChooseButton }) => {
  const { tile } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const handleChangeSize = (value: string | null) => {
    dispatch(setSize(Number(value) as 85 | 71));
  };

  const tileJSON = JSON.stringify(tile);
  useEffect(() => {
    localStorage.setItem("tile", tileJSON);
  }, [tileJSON]);

  const sizes = [
    { value: "71", label: "240х71 мм" },
    { value: "85", label: "240х85 мм" },
  ];

  return (
    <>
      <Select
        label="Размер"
        value={String(tile.size)}
        data={sizes}
        onChange={handleChangeSize}
      />

      {tile[tile.size].length ? (
        <Flex gap="2%" wrap="wrap">
          {tile[tile.size][0] === undefined ? null : (
            <TileElement
              tile={tile[tile.size][0]}
              value={tile[tile.size][0].value}
            />
          )}
          {tile[tile.size][1] === undefined ? null : (
            <TileElement
              tile={tile[tile.size][1]}
              value={tile[tile.size][1].value - tile[tile.size][0].value}
            />
          )}
          {tile[tile.size][2] === undefined ? null : (
            <TileElement
              tile={tile[tile.size][2]}
              value={tile[tile.size][2].value - tile[tile.size][1].value}
            />
          )}
          {tile[tile.size][3] === undefined ? null : (
            <TileElement
              tile={tile[tile.size][3]}
              value={tile[tile.size][3].value - tile[tile.size][2].value}
            />
          )}
          {tile[tile.size][4] === undefined ? null : (
            <TileElement
              tile={tile[tile.size][4]}
              value={tile[tile.size][4].value - tile[tile.size][3].value}
            />
          )}
        </Flex>
      ) : null}
      {tile[tile.size].length < 5 && (
        <Button leftSection={<IconPlus />} onClick={handleClickChooseButton}>
          Выбрать цвет
        </Button>
      )}
    </>
  );
};

export default Tile;
