import { FC } from "react";
import { useDispatch } from "react-redux";
import { setType } from "../../redux/slices/sliderbarReducer";

import { rem, Tabs } from "@mantine/core";
import { IconSolarPanel, IconWall } from "@tabler/icons-react";

const Sidebar: FC = () => {
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
