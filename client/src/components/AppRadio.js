import styled, { css } from 'styled-components';

const AppRadioStyles = css`
  position: absolute;
  top: .3em;
  left: 0;
  display: block;
  width: .75em;
  height: .75em;
  border-radius: 50%;
  content: "";
`;

const AppRadio = styled.label`
  position: relative;
  padding-left: 1.5em;
  cursor: pointer;

  &:before {
    ${AppRadioStyles}
    border: ${props => props.theme.sizes.borderWidth + ' solid ' + props.theme.colors.accent};
  }

  &:after {
    ${AppRadioStyles}
    transform: scale(.5);
    ${props => props.checked && 'background: ' + props.theme.colors.accent};
  }

  &:hover {
    &:after {
      background: ${props => props.theme.colors.accent}
    }
  }
`

export default AppRadio;
