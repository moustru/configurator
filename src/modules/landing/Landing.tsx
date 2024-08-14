import { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, rem, Title, Text } from "@mantine/core";
import { setType } from "../../redux/slices/sliderbarReducer";

const Landing: FC = () => {
  const dispatch = useDispatch();

  const beginWork = () => {
    dispatch(setType("panel"));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#fff",
        padding: "32px 0px 0px 32px",
        position: "relative",
        textAlign: "center",
      }}
    >
      <Title order={1} ta="center" my={rem(32)}>
        Добро пожаловать в конфигуратор!
      </Title>

      <Text ta="center">
        Здесь вы сможете подобрать цвет, ширину и длину панелей, смешать их и
        отправить на печать
      </Text>

      <Button size="lg" onClick={beginWork} mt={rem(32)}>
        Начать работу
      </Button>
    </div>
  );
};

export default Landing;
