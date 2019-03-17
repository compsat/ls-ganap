import React from "react";

import AppCardBase from "components/common/AppCardBase";
import AppCardImage from "components/common/AppCardImage";
import AppCardTextBox from "components/common/AppCardTextBox";
import AppText from "components/common/AppText";
import { Link } from "react-router-dom";

const AppTextP = AppText.withComponent("p");

const EventCard = ({
  eventId,
  name,
  formattedHosts,
  formattedDate,
  formattedTime,
  venue,
  poster_url
}) => (
  <AppCardBase>
    <Link to={`/events/${eventId}`}><AppCardImage src={poster_url} aspectRatio={5 / 4} alt={name} /></Link>
    <AppCardTextBox lines={3}>
      <AppTextP>{name}</AppTextP>
      {/* <AppTextP>{formattedHosts}</AppTextP> */}
      <AppTextP>{formattedDate}</AppTextP>
      {/* <AppTextP>{formattedTime}</AppTextP>
      <AppTextP>{venue}</AppTextP> */}
    </AppCardTextBox>
  </AppCardBase>
);

export default EventCard;
