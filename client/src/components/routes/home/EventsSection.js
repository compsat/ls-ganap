import React, { Component } from "react";

import AppHeading from "components/common/AppHeading";
import HorizontalScroller from "components/common/HorizontalScroller.js";
import PageContent from "components/common/PageContent";
import CardsSection from "components/routes/home/CardsSection";
import EventCardContainer from "containers/EventCardContainer";
import EventCard from "components/routes/home/EventCard";

const EventsCardsSection = CardsSection.extend`
  background-color: #88cfc9;
`;

const SectionHeading = AppHeading.withComponent("h2").extend`
  margin-bottom: 2rem;
  color: #F8FFEB;
`;

class EventsSection extends Component {
  componentDidMount() {
    this.props.fetchEventsUpcoming();
  }

  render() {
    return (
      <EventsCardsSection>
        <PageContent>
          <SectionHeading size="6">Upcoming events</SectionHeading>
        </PageContent>
        <HorizontalScroller display={4} hasLoaded={this.props.canDisplayEvents}>
          {this.props.eventsUpcoming.map(id => (
            <EventCardContainer key={id} component={EventCard} id={id} />
          ))}
        </HorizontalScroller>
      </EventsCardsSection>
    );
  }
}

export default EventsSection;
