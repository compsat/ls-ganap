import styled from 'styled-components';
import { modularScale } from '../style/style-utils';

const AppText = styled.span`
  font-family: 'Nirmala UI';
  font-size: ${props => modularScale(props.size)};
`

export default AppText;
