import React, { Component } from "react";
import styled from "styled-components";

import AppHeading from "components/common/AppHeading";
import EventCard from "components/routes/browse/EventCard";
import EventCardContainer from "containers/EventCardContainer";
import { media } from "style/style-utils";

import axios from "axios";

const DashboardHeading = styled(AppHeading)`
  font-size: 1.7em;
  ${media.mdScreen`
    font-size: 1.7em;
  `}
`

const DashboardPendingHeading = styled(DashboardHeading)`
  ${media.mdScreen`
    margin-left: 1rem;
  `}
`

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

const DashboardApprovedCard = styled.div`
  ${media.mdScreen`
    margin-top: 1.3rem;
    margin-right: 1.8rem;
  `}
`

const DashboardPendingCard = styled.div`
  ${media.mdScreen`
    margin-top: 1.3rem;
    margin-left: 1rem;
    margin-right: 1.2rem;
  `}
`

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
            <DashboardHeading>Approved Events</DashboardHeading>
            {this.props.canDisplayEvents &&
              this.props.eventsApproved.map(id =>
                (
                  <DashboardApprovedCard>
                    <EventCardContainer 
                      component={EventCard} 
                      id={id} 
                      key={id}
                    />
                  </DashboardApprovedCard>
                )
              )}
          </EventsApprovedBox>
          <EventsPendingBox>
            <DashboardPendingHeading>Pending Events</DashboardPendingHeading>
            {this.props.canDisplayEvents &&
              this.props.eventsPending.map(id => 
                (
                  <DashboardPendingCard>
                    <EventCardContainer 
                      component={EventCard} 
                      id={id} 
                      key={id}
                    />
                  </DashboardPendingCard>
                )
              )}
          </EventsPendingBox>
        </MainContentBox>
      </main>
    );
  }
}

export default Dashboard;
