import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import { setType } from "../../redux/slices/sliderbarReducer";

import * as S from "./Sidebar.styled";
import { rem, Tabs } from "@mantine/core";
import { IconSolarPanel, IconWall } from "@tabler/icons-react";

const Sidebar: FC = () => {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { buttonPanel, buttonTile } = useSelector(
    (state: RootState) => state.sidebar
  );
  const dispatch = useDispatch();

  const onClickPanelButton = () => {
    dispatch(setType("panel"));
  };

  const onClickPanelTile = () => {
    dispatch(setType("tile"));
  };
  return (
    <Tabs
      variant="pills"
      defaultValue="gallery"
      pos="absolute"
      top={0}
      left={0}
      w="100%"
      p={rem(16)}
    >
      <Tabs.List>
        <Tabs.Tab
          value="gallery"
          onClick={onClickPanelButton}
          leftSection={<IconSolarPanel />}
        >
          Панели
        </Tabs.Tab>
        <Tabs.Tab
          value="messages"
          onClick={onClickPanelTile}
          leftSection={<IconWall />}
        >
          Плитка
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default Sidebar;
