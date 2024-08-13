import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../redux";

import {
  setColor,
  setWidth,
  setHeight,
} from "../../../redux/slices/sliderbarReducer";

import { Select, Slider, Text } from "@mantine/core";

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
      <Select
        label="Цвет"
        value={panel.color}
        data={panels}
        onChange={handleChangeColor}
        rightSection={
          <div
            style={{
              backgroundColor: panels.find((pan) => pan.value === panel.color)
                ?.color,
              width: "32px",
              height: "32px",
            }}
          />
        }
      />
      <Select
        label="Высота"
        value={String(panel.height)}
        data={heights}
        onChange={handleChangeHeight}
      />
      {/* <S.StyleFormControl
        fullWidth={true}
        $fullHeight={false}
        sx={{ mt: "33px" }}
      >
        <InputLabel id="height">Высота</InputLabel>
        <S.SelectWithColor
          labelId="height"
          value={panel.height}
          variant="standard"
          onChange={handleChangeHeight}
        >
          <MenuItem value={300}>300 мм</MenuItem>
          <MenuItem value={400}>400 мм</MenuItem>
          <MenuItem value={600}>600 мм</MenuItem>
        </S.SelectWithColor>
      </S.StyleFormControl> */}

      <Text size="sm" color="white.0">
        Ширина, мм
      </Text>
      <Slider
        defaultValue={900}
        onChangeEnd={handleChangeWidth}
        min={600}
        max={1500}
        step={50}
      />
      {/* <S.StyleFormControl
        fullWidth={true}
        $fullHeight={false}
        sx={{ mt: "33px" }}
      >
        <S.SliderTitle>
          Ширина: <span>{panel.width} мм</span>
        </S.SliderTitle>
        <Slider
          value={panel.width}
          color="primary"
          onChange={handleChangeWidth}
          aria-label="Ширина"
          defaultValue={600}
          step={50}
          min={600}
          max={1500}
        />
        <S.Marks>
          <span>600мм</span>
          <span>1500мм</span>
        </S.Marks>
      </S.StyleFormControl> */}
    </>
  );
};

export default Panel;
