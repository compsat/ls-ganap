import React from "react";
import styled from "styled-components";

const Article = styled.article`
  border-radius: 0.3rem;
  background-color: #fcfcfc;
  box-shadow: 0 0.1rem 0.6rem rgba(0, 0, 0, 0.16);
  cursor: pointer;
`;

const AspectRatioContainer = styled.div`
  display: grid;
  min-width: 25%;

  & > * {
    grid-area: 1/1/2/2;
  }
`;

const Svg = styled.svg`
  height: 100%;
`;

const BackgroundImage = styled.div`
  background-image: url(${props => props.img});
  background-size: ${props => props.imgSize};
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
`;

const TextBox = styled.div`
  min-width: 75%;
  padding: 1em;
`;

const AppCard = ({
  img = "",
  imgSize = "cover",
  imgAspectRatio = 1,
  imgAlt = "",
  isLandscape = false,
  children = null
}) => {
  return (
    <Article isLandscape={isLandscape}>
      <AspectRatioContainer>
        <Svg viewBox={`0 0 1 ${imgAspectRatio}`} />
        <BackgroundImage
          role="img"
          img={img}
          aria-label={imgAlt}
          title={imgAlt}
          imgSize={imgSize}
        />
      </AspectRatioContainer>
      <TextBox>{children}</TextBox>
    </Article>
  );
};

export default AppCard;
