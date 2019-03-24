import AppText from "components/common/AppText";

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
  background: ${props => (props.empty ? "none" : "#404937")};
  color: ${props => (props.empty ? "#404937" : props.theme.colors.white)};
  text-transform: uppercase;
  text-decoration: none;
  outline: none;
  cursor: pointer;

  ${props =>
    !props.empty &&
    `&:hover {
      box-shadow: inset 0 0 999em rgba(0, 0, 0, 0.5);
    }`}
`;

export default AppButton;
