/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { initPanel, initTile } from "./redux/slices/sliderbarReducer";
import GlobalStyle from "./theme/global";
import MainPage from "./modules/main/MainPage";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tile = localStorage.getItem("tile");
    if (tile !== null) {
      dispatch(initTile(JSON.parse(tile)));
    } else {
      const firstTile = {
        71: [
          {
            id: 1,
            title: "3D20-7",
            background: "tiles/1.jpg",
            imgs: 4,
            value: 100,
          },
        ],
        85: [
          {
            id: 17,
            title: "WY016",
            background: "tiles/17.jpg",
            imgs: 3,
            value: 100,
          },
        ],
        size: 71,
      };
      // @ts-ignore
      dispatch(initTile(firstTile));
    }

    const panel = localStorage.getItem("panel");
    if (panel !== null) {
      dispatch(initPanel(JSON.parse(panel)));
    } else {
      const firstPanel = {
        color: "B-2",
        width: 600,
        height: 300,
      };
      // @ts-ignore
      dispatch(initPanel(firstPanel));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainPage />
    </>
  );
};

export default App;
