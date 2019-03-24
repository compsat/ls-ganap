import React from "react";

import AppCardBase from "components/common/AppCardBase";
import AppCardImage from "components/common/AppCardImage";
import AppCardTextBox from "components/common/AppCardTextBox";
import AppText from "components/common/AppText";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AppTextP = AppText.withComponent("p");

const AppCardLink = ({ className, route, children, onClick }) => (
  <Link className={className} to={route} onClick={onClick}>
    {children}
  </Link>
);

const StyledAppCardLink = styled(AppCardLink)`
  text-decoration: none;
  color: black;
`;

const EventCard = ({
  eventId,
  name,
  formattedHosts,
  formattedDate,
  formattedTime,
  venue,
  poster_url
}) => (
  <StyledAppCardLink route={`/events/${eventId}`}>
    <AppCardBase>
      <AppCardImage src={poster_url} aspectRatio={5 / 4} alt={name} />
      <AppCardTextBox lines={3}>
        <AppTextP>{name}</AppTextP>
        {/* <AppTextP>{formattedHosts}</AppTextP> */}
        <AppTextP>{formattedDate}</AppTextP>
        {/* <AppTextP>{formattedTime}</AppTextP>
        <AppTextP>{venue}</AppTextP> */}
      </AppCardTextBox>
    </AppCardBase>
  </StyledAppCardLink>
);

export default EventCard;
