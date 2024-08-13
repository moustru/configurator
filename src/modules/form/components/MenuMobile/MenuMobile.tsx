import { FC, useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Menu } from "@mui/material";

import * as S from "./MenuMobile.styled";
import SwitchLabel from "../SwitchLabel/SwitchLabel";
import { RootState, store } from "../../../../redux";
import { setTheme } from "../../../../redux/slices/themeReducer";
import { Color, Theme } from "../../../../theme/theme";
import {
  downloadJPEGPanel,
  downloadJPEGTile71,
  downloadJPEGTile85,
} from "../../../save/downloadJPEG";
import { save3D } from "../../../save/save3D";

const MenuMobile: FC = () => {
  const state = store.getState().sidebar;

  const { isDark } = useSelector((store: RootState) => store.theme);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = () => {
    if (isDark) {
      dispatch(setTheme(Theme.WHITE));
      localStorage.setItem("theme", Theme.WHITE);
    } else {
      dispatch(setTheme(Theme.DARK));
      localStorage.setItem("theme", Theme.DARK);
    }
  };

  /** SAVE JPEG*/
  const handleClickSaveJPEG = () => {
    const width = 1000;
    const height = 1000;
    const multiplier = 1;

    if (state.buttonPanel) {
      downloadJPEGPanel(state, width, height, multiplier);
    }

    if (state.buttonTile) {
      if (state.tile.size === 71) {
        downloadJPEGTile71(state, width, height, multiplier);
      }
      if (state.tile.size === 85) {
        downloadJPEGTile85(state, width, height, multiplier);
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <S.ShowMoreButton />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            width: "236px",
            background: `${isDark ? Color.GREY : Color.WHITE}`,
          },
        }}
        onClose={handleClose}
      >
        <S.MenuStyledItem onClick={handleClickSaveJPEG}>
          Скачать JPEG (2D)
        </S.MenuStyledItem>
        <S.MenuStyledItem onClick={() => save3D()}>
          Скачать PDF (3D)
        </S.MenuStyledItem>
        <S.MenuStyledItem onKeyDown={handleChange}>
          Ночная тема <SwitchLabel />
        </S.MenuStyledItem>
      </Menu>
    </div>
  );
};

export default MenuMobile;
