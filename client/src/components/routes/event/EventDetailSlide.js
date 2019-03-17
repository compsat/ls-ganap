import React from "react";
import styled from "styled-components";

import AppButton from "components/common/AppButton";
import AppCardImage from "components/common/AppCardImage";
import AppHeading from "components/common/AppHeading";
import AppSubheading from "components/common/AppSubheading";
import AppText from "components/common/AppText";
import { media } from "style/style-utils";

const SlideArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.mdScreen`
    flex-direction: row;
    align-items: center;
    height: 100%;
  `}
`;

const SlidePoster = styled(AppCardImage)`
  width: 35%;
`;

const TextBox = styled.div`
  width: 60%;
  height: 80%;
`;

const SlideHeadingH2 = AppHeading.withComponent("h2");
const SlideSubheadingP = AppSubheading.withComponent("p");
const SlideTextP = AppText.withComponent("p");

const SlideDescription = AppText.withComponent("p").extend`
  width: 75%;
  margin-bottom: 2rem;
`;

const formatLogistics = (formattedAllDates, formattedAllTimes, allVenues) => {
  const logisticComponents = []
  for(var i = 0; i < formattedAllDates.length; i++) {
    logisticComponents.push(
      <div>
        <SlideTextP>{formattedAllDates[i]}</SlideTextP>
        <SlideTextP>{formattedAllTimes[i]}</SlideTextP>
        <SlideTextP style={{ marginBottom: "1rem" }}>{allVenues[i]}</SlideTextP>
      </div>
    )
  }
  return logisticComponents
}

const EventDetailSlide = ({
  eventId,
  name,
  allHosts,
  formattedAllDates,
  formattedAllTimes,
  allVenues,
  poster_url,
  description
}) => (
  <SlideArticle>
    {console.log(allHosts)}
    <SlidePoster src={poster_url} aspectRatio={4 / 3} />
    <TextBox>
      <SlideHeadingH2 size={4}>{name}</SlideHeadingH2>
      <SlideSubheadingP size={2} style={{ marginBottom: "1rem" }}>
        {allHosts}
      </SlideSubheadingP>
      {formatLogistics(formattedAllDates, formattedAllTimes, allVenues)}
      <SlideDescription>{description}</SlideDescription>
      <a href={`${process.env.REACT_APP_API_URL}/gcal/events/${eventId}`}><AppButton>Add to My Calendar</AppButton></a>
    </TextBox>
  </SlideArticle>
);

export default EventDetailSlide;
