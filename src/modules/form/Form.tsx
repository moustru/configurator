import { useState, useEffect, MouseEvent } from "react";

import { useSelector } from "../../redux";

import Panel from "./components/Panel";
import Tile from "./components/Tile";
import ChooseColor from "./components/ChooseColor";

// import {
//   downloadJPEGPanel,
//   downloadJPEGTile71,
//   downloadJPEGTile85,
// } from "../save/downloadJPEG";
// import { save3D } from "../save/save3D";
// import MenuMobile from "./components/MenuMobile/MenuMobile";
import { rem, Stack } from "@mantine/core";

// const Form: FC<IProps> = ({ isFormExpanded, expandForm }) => {
const Form = () => {
  // const { isMobile } = useWindowSize();
  const [isColorChooserOpened, ColorChooseOpen] = useState(false);
  // const state = store.getState().sidebar;

  const { buttonPanel } = useSelector((state) => state.sidebar);

  // const { buttonPanel, buttonTile } = useSelector((state) => state.sidebar);
  // const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const handleClickChooseButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    ColorChooseOpen(true);
  };

  // const handleClickSaveJPEG = () => {
  //   const width = 1000;
  //   const height = 1000;
  //   const multiplier = 1;

  //   if (state.buttonPanel) {
  //     downloadJPEGPanel(state, width, height, multiplier);
  //   }

  //   if (state.buttonTile) {
  //     if (state.tile.size === 71) {
  //       downloadJPEGTile71(state, width, height, multiplier);
  //     }
  //     if (state.tile.size === 85) {
  //       downloadJPEGTile85(state, width, height, multiplier);
  //     }
  //   }
  // };

  useEffect(() => {
    ColorChooseOpen(false);
  }, [buttonPanel]);

  return (
    <Stack
      pos="absolute"
      top={{ md: "77px" }}
      bottom={{ xs: 0 }}
      left={0}
      w={{ base: "100%", lg: "350px", md: "300px" }}
      p={rem(16)}
      justify="flex-start"
      bg="rgba(0, 0, 0, .4)"
      style={{ zIndex: 1 }}
    >
      {buttonPanel ? (
        <Panel />
      ) : (
        <Tile
          handleClickChooseButton={handleClickChooseButton}
          hidden={isColorChooserOpened}
        />
      )}
      {isColorChooserOpened ? (
        <ChooseColor handleClose={() => ColorChooseOpen(false)} />
      ) : null}
    </Stack>
    // <S.FormView $isFormExpanded={isFormExpanded}>
    //   {isMobile ? (
    //     <S.FilterWrapper>
    //       <S.FilterTitle>Фильтры</S.FilterTitle>
    //       <S.Arrow
    //         onClick={() => expandForm(!isFormExpanded)}
    //         $isOpen={isFormExpanded}
    //       />
    //     </S.FilterWrapper>
    //   ) : null}
    //   {isFormExpanded ? (
    //     buttonPanel ? (
    //       <Panel />
    //     ) : (
    //       <Tile
    //         handleClickChooseButton={handleClickChooseButton}
    //         hidden={isColorChooserOpened}
    //       />
    //     )
    //   ) : null}
    //   {isColorChooserOpened ? (
    //     <ChooseColor handleClose={() => ColorChooseOpen(false)} />
    //   ) : null}

    //   {!isMobile ? (
    //     <S.Panel>
    //       <S.Download
    //         onClick={
    //           buttonPanel || buttonTile
    //             ? handleClickSaveJPEG
    //             : () => setDialogIsOpen(true)
    //         }
    //       >
    //         Скачать JPEG (2D)
    //       </S.Download>
    //       <S.Download
    //         onClick={
    //           buttonPanel || buttonTile
    //             ? () => save3D("PDF")
    //             : () => setDialogIsOpen(true)
    //         }
    //       >
    //         Скачать PDF (3D)
    //       </S.Download>
    //       {/*<S.Print onClick={buttonPanel || buttonTile ? () => save3D('print') : () => setDialogIsOpen(true) }><Printer /></S.Print>*/}
    //       <SwitchLabel />

    //       <Dialog
    //         open={dialogIsOpen}
    //         aria-labelledby="Выберете плитку"
    //         aria-describedby="Выберете плитку"
    //         sx={{ width: "100%" }}
    //       >
    //         <DialogTitle>Печать и сохранение сейчас недоступны</DialogTitle>
    //         <DialogContent>
    //           <DialogContentText>
    //             Пожалуйста, выберите хотя бы одну панель или плитку
    //           </DialogContentText>
    //         </DialogContent>
    //         <DialogActions>
    //           <Button onClick={() => setDialogIsOpen(false)} autoFocus>
    //             Закрыть
    //           </Button>
    //         </DialogActions>
    //       </Dialog>
    //     </S.Panel>
    //   ) : (
    //     <MenuMobile />
    //   )}
    // </S.FormView>
  );
};

export default Form;
