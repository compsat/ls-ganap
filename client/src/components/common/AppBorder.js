import styled from "styled-components";
import theme from "style/style-theme";

const AppBorder = styled.div`
  outline-width: ${theme.sizes.borderWidth};
  outline-offset: -${parseInt(theme.sizes.borderWidth, 10) / 2}px;
  outline-style: solid;
  outline-color: ${theme.colors.border};
`;

export default AppBorder;
