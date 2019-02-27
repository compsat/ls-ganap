import React from "react";
import styled from "styled-components";

const AspectRatioContainer = styled.div`
  display: grid;
  min-width: 25%;

  & > * {
    grid-area: 1/1/2/2;
  }
`;

const BackgroundImage = styled.div`
  background-image: url(${props => props.src});
  background-size: ${props => props.size};
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
`;

const AppCardImage = ({
  className = "",
  src = "",
  size = "cover",
  aspectRatio,
  alt = ""
}) => (
  <AspectRatioContainer className={className}>
    {aspectRatio && <svg viewBox={`0 0 1 ${aspectRatio}`} />}
    <BackgroundImage
      role="img"
      src={src}
      size={size}
      title={alt}
      aria-label={alt}
    />
  </AspectRatioContainer>
);

export default AppCardImage;
