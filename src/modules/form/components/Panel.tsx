import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../redux";
import {
  setColor,
  setWidth,
  setHeight,
} from "../../../redux/slices/sliderbarReducer";
import { Flex, rem, Select, Slider, Stack, Text } from "@mantine/core";

const Panel: FC = () => {
  const { panel } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const handleChangeWidth = (value: number) => {
    dispatch(setWidth(value));
  };
  const handleChangeColor = (value: string | null) => {
    dispatch(setColor(value as string));
  };
  const handleChangeHeight = (value: string | null) => {
    dispatch(setHeight(Number(value)));
  };

  const panelJSON = JSON.stringify(panel);
  useEffect(() => {
    localStorage.setItem("panel", panelJSON);
  }, [panelJSON]);

  const panels = [
    { value: "B-2", label: "B-2", color: "#8b958d" },
    { value: "B-10", label: "B-10", color: "#7e807f" },
    { value: "B-22", label: "B-22", color: "#4a5350" },
    { value: "C-12", label: "C-12", color: "#7f5c46" },
    { value: "C-15-1", label: "C-15-1", color: "#4a2e2a" },
    { value: "O105", label: "O105", color: "#f2efea" },
    { value: "R-01", label: "R-01", color: "#bc5f26" },
    { value: "R-09", label: "R-09", color: "#a33d24" },
    { value: "T-5", label: "T-5", color: "#9f7a4d" },
    { value: "Y-13", label: "Y-13", color: "#b68400" },
  ];

  const heights = [
    { value: "300", label: "300 мм" },
    { value: "400", label: "400 мм" },
    { value: "600", label: "600 мм" },
  ];

  return (
    <>
      <Text size="sm" c="white.0">
        Цвет
      </Text>
      <Flex
        wrap="wrap"
        gap={{ base: rem(12), xs: 0, md: rem(12) }}
        rowGap={{ base: rem(12), xs: rem(8) }}
      >
        {panels.map((pan) => (
          <Stack
            w={{
              base: rem(96),
              xs: "20%",
              sm: "16%",
              md: rem(72),
              lg: rem(96),
            }}
            h={{ base: rem(96), xs: "72px", md: rem(72), lg: rem(96) }}
            pos="relative"
            key={pan.color + pan.label}
            onClick={() => handleChangeColor(pan.label)}
            style={{
              border: "2px solid transparent",
              borderColor: pan.label === panel.color ? "white" : "transparent",
            }}
          >
            <Stack bg={pan.color} w="100%" h="100%" />
            <Text
              pos="absolute"
              bottom={0}
              left={0}
              w="100%"
              bg="rgba(255, 255, 255, .5)"
              ta="center"
            >
              {pan.label}
            </Text>
          </Stack>
        ))}
      </Flex>
      <Select
        label="Высота"
        value={String(panel.height)}
        data={heights}
        onChange={handleChangeHeight}
      />

      <Text size="sm" c="white.0">
        Ширина, мм
      </Text>
      <Slider
        defaultValue={900}
        onChangeEnd={handleChangeWidth}
        min={600}
        max={1500}
        step={50}
      />
    </>
  );
};

export default Panel;
