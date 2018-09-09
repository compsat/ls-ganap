import styled from 'styled-components';
import { modularScale } from '../style/style-utils';

const AppText = styled.span`
  font-family: 'Nirmala UI';
  font-size: ${props => props.size ? modularScale(props.size) : '1em'};
`

export default AppText;
