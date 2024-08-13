/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, MouseEvent } from "react";

import AddIcon from "@mui/icons-material/Add";
import { tileData, ITile } from "../../../static/tile";

import * as S from "../Form.styled";
import { useDispatch, useSelector } from "../../../redux";
import {
  setAddTile,
  tileSelected,
} from "../../../redux/slices/sliderbarReducer";

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
    <S.ChooseColor>
      <S.Button
        $marginTop={false}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        Закрыть
      </S.Button>
      {
        // @ts-ignore
        tileData[size].map((tile) =>
          tileSelected[tile.id - 1] ? null : (
            <S.ColorTile
              key={tile.id}
              onClick={(event) => handleClickAdd(event, tile)}
            >
              <div>
                <S.Background src={tile.background} />
              </div>
              <S.AddButton onClick={(event) => event.preventDefault()}>
                {tile.title}{" "}
                <AddIcon onClick={(event) => handleClickAdd(event, tile)} />
              </S.AddButton>
            </S.ColorTile>
          )
        )
      }
      <S.Button
        $marginTop={false}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        Закрыть
      </S.Button>
    </S.ChooseColor>
  );
};

export default ChooseColor;
