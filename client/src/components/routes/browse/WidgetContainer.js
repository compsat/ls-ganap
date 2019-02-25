import AppBorder from "components/common/AppBorder";
import { media } from "style/style-utils";

const WidgetContainer = AppBorder.extend`
  background: ${props => props.theme.colors.white};
  padding: 1em;

  ${media.mdScreen`
    background: none;
  `}
`;

export default WidgetContainer;
