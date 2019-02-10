import { css } from 'styled-components';
import theme from "../style/style-theme";
import AppText from "../common/AppText";

const AppButtonActive = css`
  background: ${theme.colors.accent};
  color: ${theme.colors.white};
`;

const AppButton = AppText.withComponent("button").extend`
  display: inline-block;
  padding-top: .3em;
  padding-right: .66em;
  padding-left: .66em;
  padding-bottom: .35em;
  border-width: ${props => props.theme.sizes.borderWidth};
  border-style: solid;
  border-color: ${props => props.theme.colors.accent};
  border-radius: .5em;
  margin-right: .5em;
  margin-bottom: .5em;
  background: none;
  color: ${props => props.theme.colors.accent};
  outline: none;
  cursor: pointer;

  &:hover { ${AppButtonActive} }
  ${props => props.active && AppButtonActive }
`;

export default AppButton;
