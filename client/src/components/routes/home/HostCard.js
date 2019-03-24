import React from "react";

import AppCardBase from "components/common/AppCardBase";
import AppCardImage from "components/common/AppCardImage";
import AppCardTextBox from "components/common/AppCardTextBox";
import AppText from "components/common/AppText";

const HostCard = ({ id, name, logoUrl }) => (
  <AppCardBase key={id}>
    <AppCardImage src={logoUrl} size={"75%"} aspectRatio={1} alt={name} />
    <AppCardTextBox lines={3} center={true}>
      <AppText>{name}</AppText>
    </AppCardTextBox>
  </AppCardBase>
);

export default HostCard;
