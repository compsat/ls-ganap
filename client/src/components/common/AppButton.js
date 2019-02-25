import { css } from "styled-components";
import AppText from "components/common/AppText";

const AppButtonActive = css`
  box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.5);
`;

const AppButton = AppText.withComponent("button").extend`
  display: inline-block;
  padding-top: .6em;
  padding-right: .9em;
  padding-left: .9em;
  padding-bottom: .66em;
  border-width: 0;
  border-radius: .25em;
  margin-right: .5em;
  margin-bottom: .5em;
  ${props =>
    props.empty
      ? `
    background: none;
    color: #404937;
  `
      : `
    background: #404937;
    color: ${props.theme.colors.white};
  `}
  text-transform: uppercase;
  text-decoration: none;
  outline: none;
  cursor: pointer;

  ${props =>
    !props.empty &&
    `
    &:hover { ${AppButtonActive} }
    ${props.active && AppButtonActive}
  `}
`;

export default AppButton;
