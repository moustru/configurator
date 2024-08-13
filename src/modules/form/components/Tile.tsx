/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, MouseEvent } from "react";
import { useSelector, useDispatch } from "../../../redux";

import ClearIcon from "@mui/icons-material/Clear";
import { ITile } from "../../../static/tile";

import { setSize, setRemoveTile } from "../../../redux/slices/sliderbarReducer";

import * as S from "../Form.styled";
import { Button, Select } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

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
    <S.TileOption $value={value}>
      <S.T>
        <span>{tile.title}</span>
        <S.PreviewTileDiv>
          <S.PreviewTile src={tile.background} />
        </S.PreviewTileDiv>
        <S.DivFlex>
          {`${value}%`}
          <S.DivFlex>
            <ClearIcon onClick={(event) => handleClickRemove(event, tile)} />
          </S.DivFlex>
        </S.DivFlex>
      </S.T>
    </S.TileOption>
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
        <S.SizeWrapper>
          <S.TileWrapper>
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
          </S.TileWrapper>
        </S.SizeWrapper>
      ) : null}
      {tile[tile.size].length <= 5 && (
        <Button leftSection={<IconPlus />} onClick={handleClickChooseButton}>
          Выбрать цвет
        </Button>
      )}
    </>
  );
};

export default Tile;
