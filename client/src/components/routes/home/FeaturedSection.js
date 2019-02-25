import React, { Component } from "react";

import FullWidthContainer from "components/common/FullWidthContainer";
import HorizontalScroller from "components/common/HorizontalScroller";
import FeaturedSectionSlide from "components/routes/home/FeaturedSectionSlide";
import EventCardContainer from "containers/EventCardContainer";

const SlideSection = FullWidthContainer.withComponent("section").extend`

`;

class EventsSection extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <SlideSection>
        <HorizontalScroller display={1} hasLoaded={this.props.canDisplayEvents}>
          {Object.values(this.props.events.items).map(event => (
            <EventCardContainer
              component={FeaturedSectionSlide}
              id={event.id}
              key={event.id}
            />
          ))}
        </HorizontalScroller>
      </SlideSection>
    );
  }
}

export default EventsSection;
