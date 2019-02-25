import styled from "styled-components";
import theme from "style/style-theme";

const AppCardTextBox = styled.div`
  height: ${props => +props.lines * theme.type.lineHeight + 2}em;
  padding: 1em;
  ${props => props.center && "text-align: center;"}
`;

export default AppCardTextBox;
