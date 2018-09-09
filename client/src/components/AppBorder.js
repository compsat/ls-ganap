import styled from 'styled-components';
import theme from '../style/style-theme';

const AppBorder = styled.div`
  ${props => (!props.border || props.border.includes('top')) &&
    'border-top-width: ' + theme.sizes.borderWidth};
  ${props => (!props.border || props.border.includes('right')) &&
    'border-right-width: ' + theme.sizes.borderWidth};
  ${props => (!props.border || props.border.includes('bottom')) &&
    'border-bottom-width: ' + theme.sizes.borderWidth};
  ${props => (!props.border || props.border.includes('left')) &&
    'border-left-width: ' + theme.sizes.borderWidth};
  border-style: solid;
  border-color: ${theme.colors.border};
`;

export default AppBorder;
