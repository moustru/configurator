import { FC } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../../hooks/useWindowSize";
import { RootState } from "../../redux";

import * as S from "./Landing.styled";
import { Typography } from "@mui/material";
import { rem, Title } from "@mantine/core";

const Landing: FC = () => {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { isNoDesktop, isMobile } = useWindowSize();
  return (
    <S.LandingView $isDark={isDark}>
      <Title order={1} ta="center" my={rem(32)}>
        Добро пожаловать в конфигуратор!
      </Title>

      <Typography variant="body1" textAlign="center">
        Здесь вы сможете подобрать цвет, ширину и длину панелей, смешать их и
        отправить на печать
      </Typography>
      {/* <S.Option $isDark={isDark}>
        <S.Border $isDark={isDark} />
        Подберите необходимый цвет, ширину <br /> и длину панелей
      </S.Option>
      <S.Option $isDark={isDark}>
        <S.Border $isDark={isDark} />
        Смешивайте цвет и меняйте размер плитки
      </S.Option>
      <S.Option $isDark={isDark}>
        <S.Border $isDark={isDark} />
        Отправляйте на печать или скачивайте получившееся решение в нужном
        формате
      </S.Option> */}
      {/* {!isMobile ? (
        <>
          <S.DotsWrapper>
            <S.Dots />
            {!isNoDesktop ? <S.DotsSecond /> : null}
          </S.DotsWrapper>
          <S.DotsWrapper other={true}>
            <S.Dots />
            {!isNoDesktop ? <S.DotsSecond /> : null}
          </S.DotsWrapper>
        </>
      ) : null} */}
    </S.LandingView>
  );
};

export default Landing;
