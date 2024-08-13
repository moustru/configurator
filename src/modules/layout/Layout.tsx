import { FC, ReactNode } from "react";

import * as S from "./Layout.styled";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return <S.LayoutView>{children}</S.LayoutView>;
};

export default Layout;
