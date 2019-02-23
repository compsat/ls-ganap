import React, { Component } from 'react';
import styled from "styled-components";
import SVG from "react-inlinesvg";

const SpinnerIcon = styled(SVG)`
  display: block;
  width: 2em;
  margin: 0 auto;
`;

class Loading extends Component {
  render() {
    return (
      <SpinnerIcon src={require("../assets/icon-spinner.svg")} />
    );
  }
}

export default Loading;
