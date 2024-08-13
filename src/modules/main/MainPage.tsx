import { FC, useState, useEffect } from "react";
import { useSelector } from "../../redux";

import styled from "styled-components";

import Layout from "../layout/Layout";
import Form from "../form/Form";
import Landing from "../landing/Landing";
import Canvas from "../canvas/Canvas";
import CanvasPDF from "../canvas/CanvasPDF";
import useWindowSize from "../../hooks/useWindowSize";
import Sidebar from "../siderbar/Sidebar";

const MainPage: FC = () => {
  const { buttonPanel, buttonTile } = useSelector((state) => state.sidebar);
  const [isFormExpanded, expandForm] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (!isMobile) expandForm(true);
  }, [isMobile]);

  return (
    <>
      <Layout>
        {buttonPanel || buttonTile ? (
          <>
            <Sidebar />
            <Form isFormExpanded={isFormExpanded} expandForm={expandForm} />
            <Canvas hidden={isMobile && isFormExpanded} />
          </>
        ) : (
          <Landing />
        )}
      </Layout>
      <HiddenDivStyled id={"hidden-3d"}>
        <Render3DStyled id={"render-3d"}>
          <CanvasPDF />
        </Render3DStyled>
      </HiddenDivStyled>
    </>
  );
};

export const HiddenDivStyled = styled("div")`
  position: absolute;
  width: 100%;
  top: -100%;
  left: -100%;
  z-index: -999;
  overflow: hidden;
`;

export const Render3DStyled = styled("div")`
  width: 1920px;
  height: 1080px;
`;

export default MainPage;
