import React from "react"
import styled from "styled-components"

import AppButton from "components/common/AppButton"
import AppCardImage from "components/common/AppCardImage"
import AppHeading from "components/common/AppHeading"
import AppSubheading from "components/common/AppSubheading"
import AppText from "components/common/AppText"
import { media } from "style/style-utils"
import { Link } from "react-router-dom"
import TextTruncate from "react-text-truncate"

const SlideArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.mdScreen`
    flex-direction: row;
    align-items: center;
    height: 100%;
  `}
`

const SlidePoster = styled(AppCardImage)`
  width: 35%;
`

const TextBox = styled.div`
  width: 60%;
  height: 80%;
`

const SlideHeadingH2 = AppHeading.withComponent("h2")
const SlideSubheadingP = AppSubheading.withComponent("p")
const SlideTextP = AppText.withComponent("p")

const SlideDescription = AppText.withComponent("p").extend`
  width: 75%;
  margin-bottom: 2rem;
`

const FeaturedSectionSlide = ({
  eventId,
  name,
  formattedHosts,
  formattedDate,
  formattedTime,
  venue,
  poster_url,
  audience,
  description
}) => (
  <SlideArticle>
    <SlidePoster src={poster_url} aspectRatio={4 / 3} />
    <TextBox>
      <SlideHeadingH2 size={4}>{name}</SlideHeadingH2>
      <SlideSubheadingP size={2}>{formattedHosts}</SlideSubheadingP>
      <SlideTextP size={2} style={{ marginBottom: "1rem" }}>
        {audience}
      </SlideTextP>
      <SlideTextP>{formattedDate}</SlideTextP>
      <SlideTextP>{formattedTime}</SlideTextP>
      <SlideTextP style={{ marginBottom: "1rem" }}>{venue}</SlideTextP>
      <SlideDescription>
        <TextTruncate line={5} truncateText="…" text={description} />
      </SlideDescription>
      <a
        href={`${process.env.REACT_APP_API_URL}/gcal/events/${eventId}`}
        target="_blank"
        rel="noopener"
      >
        <AppButton>Add to My Calendar</AppButton>
      </a>
      <Link to={`/events/${eventId}`}>
        <AppButton empty>Read More</AppButton>
      </Link>
    </TextBox>
  </SlideArticle>
)

export default FeaturedSectionSlide
