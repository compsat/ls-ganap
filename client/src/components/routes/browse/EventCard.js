import React from "react";
import styled from "styled-components";

import AppButton from "components/common/AppButton";
import AppCardBase from "components/common/AppCardBase";
import AppCardImage from "components/common/AppCardImage";
import AppCardTextBox from "components/common/AppCardTextBox";
import AppSubheading from "components/common/AppSubheading";
import AppText from "components/common/AppText";
import { media } from "style/style-utils";
import { Link } from "react-router-dom";

const EventCardBase = AppCardBase.extend`
  display: flex;
  flex-direction: row;
  min-height: 12em;
  margin-bottom: 1em;
`;

const EventCardImage = styled(AppCardImage)`
  width: 25%;
  min-width: 6em;
  background: url(${props => props.src}) center center;
  background-size: cover;

  ${media.mdScreen`
    min-width: 25%;
  `}
`;

const MarginAfterP = AppText.withComponent("p").extend`
  margin-bottom: 1em;
`;

const AppTextP = AppText.withComponent("p");

const AppButtonAnchor = AppButton.withComponent("a").extend`
  text-decoration: none;
`;

const EventCard = ({
  id,
  name,
  formattedHosts,
  formattedDate,
  formattedTime,
  venue,
  poster_url
}) => (
  <EventCardBase>
    <EventCardImage src={poster_url} alt={name} />
    <AppCardTextBox>
      <AppSubheading size="2">{name}</AppSubheading>
      <MarginAfterP size="0">{formattedHosts}</MarginAfterP>
      <AppTextP>{formattedDate}</AppTextP>
      <AppTextP>{formattedTime}</AppTextP>
      <MarginAfterP>{venue}</MarginAfterP>
      <AppButtonAnchor
        href={`${process.env.REACT_APP_API_URL}/gcal/events/${id}`}
      >
        Add to Calendar
      </AppButtonAnchor>
      <Link to={`/events/${id}`}><AppButton empty>Read More</AppButton></Link>
    </AppCardTextBox>
  </EventCardBase>
);

export default EventCard;
