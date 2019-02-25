import styled from "styled-components";

const InvisibleToggle = styled.input.attrs({
  type: "checkbox"
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
`;

export default InvisibleToggle;
