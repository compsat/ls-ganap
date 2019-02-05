import { media } from '../style/style-utils';
import AppBorder from '../components/AppBorder';

const WidgetContainer = AppBorder.extend`
  background: ${props => props.theme.colors.white};
  padding: 1em;

  ${media.mdScreen`
    background: none;
  `}
`;

export default WidgetContainer;
