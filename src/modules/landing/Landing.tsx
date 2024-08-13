import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";

import * as S from "./Landing.styled";
import { Typography } from "@mui/material";
import { Button, rem, Title } from "@mantine/core";
import { setType } from "../../redux/slices/sliderbarReducer";

const Landing: FC = () => {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const beginWork = () => {
    dispatch(setType("panel"));
  };

  return (
    <S.LandingView $isDark={isDark}>
      <Title order={1} ta="center" my={rem(32)}>
        Добро пожаловать в конфигуратор!
      </Title>

      <Typography variant="body1" textAlign="center">
        Здесь вы сможете подобрать цвет, ширину и длину панелей, смешать их и
        отправить на печать
      </Typography>

      <Button size="lg" onClick={beginWork} mt={rem(32)}>
        Начать работу
      </Button>
    </S.LandingView>
  );
};

export default Landing;
