import AppBorder from '../components/AppBorder';

const WidgetContainer = AppBorder.extend`
  background: ${props => props.theme.colors.white};
  padding: 1em;
`;

export default WidgetContainer;
