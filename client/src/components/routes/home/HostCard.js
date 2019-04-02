import React from "react";

import AppCardBase from "components/common/AppCardBase";
import AppCardImage from "components/common/AppCardImage";
import AppCardTextBox from "components/common/AppCardTextBox";
import AppText from "components/common/AppText";

import styled from "styled-components";
import { Link } from "react-router-dom";

const AppCardLink = ({ className, route, children, onClick }) => (
  <Link className={className} to={route} onClick={onClick}>
    {children}
  </Link>
);

const StyledAppCardLink = styled(AppCardLink)`
  text-decoration: none;
  color: black;
`;

const HostCard = ({ host, selectHost }) => (
  <StyledAppCardLink route="/browse" onClick={() => selectHost(host)}>
    <AppCardBase key={host.id}>
      <AppCardImage
        src={host.logo_url}
        size={"75%"}
        aspectRatio={1}
        alt={host.name}
      />
      <AppCardTextBox lines={3} center={true}>
        <AppText>{host.name}</AppText>
      </AppCardTextBox>
    </AppCardBase>
  </StyledAppCardLink>
);

export default HostCard;
