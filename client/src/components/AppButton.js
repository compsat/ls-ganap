import AppText from "../components/AppText";

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

  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
  }
`;

export default AppButton;
