import styled from "styled-components";
import { interpolate } from "../style/style-utils";

const AppText = styled.span`
  font-family: "Nirmala UI";
  ${props => interpolate(
    "font-size",
    `${props.theme.sizes.minSiteWidth}`,
    `${props.theme.sizes.maxSiteWidth}`,
    `${props.theme.type.minScale ** ((+props.size || 1) + 1) * 11}px`,
    `${props.theme.type.maxScale ** ((+props.size || 1) + 1) * 11}px`
  )};
  text-align: ${props => props.align || "left"};
`;

export default AppText;
