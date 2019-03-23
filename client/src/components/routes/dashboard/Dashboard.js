import React, { Component } from "react";
import styled from "styled-components";

import AppHeading from "components/common/AppHeading";
import EventCard from "components/routes/browse/EventCard";
import EventCardContainer from "containers/EventCardContainer";
import { media } from "style/style-utils";

const MainContentBox = styled.div`
  ${media.mdScreen`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `}
`;
const EventsApprovedBox = styled.div`
  ${media.mdScreen`
    width: 50%;
    float: left;
  `}
`;
const EventsPendingBox = styled.div`
  ${media.mdScreen`
    width: 50%;
    float: right;
  `}
`;

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchEventsApproved(this.props.userId);
    this.props.fetchEventsPending();
  }

  render() {
    return (
      <main>
        <MainContentBox>
          <EventsApprovedBox>
            <AppHeading>Approved Events</AppHeading>
            {this.props.canDisplayEvents &&
              this.props.eventsApproved.map(id => {
                return (
                  <li key={id}>
                    <EventCardContainer component={EventCard} id={id} />
                  </li>
                );
              })}
          </EventsApprovedBox>
          {/* <EventsPendingBox>
            <AppHeading>Pending Events</AppHeading>
            {this.props.canDisplayEvents &&
              this.props.eventsPending.map(id => (
                <li key={id}>
                  <EventCardContainer component={EventCard} id={id} />
                </li>
              ))}
          </EventsPendingBox> */}
        </MainContentBox>
      </main>
    );
  }
}

export default Dashboard;
