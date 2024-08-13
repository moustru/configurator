import styled from "styled-components";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MenuItem } from "@mui/material";
import { Color } from "../../../../theme/theme";

export const MenuStyledItem = styled(MenuItem)`
  color: ${Color.BLUE} !important;
  justify-content: space-between !important;
`;

export const ShowMoreButton = styled(MoreVertIcon)`
  color: ${Color.BLUE};
`;
