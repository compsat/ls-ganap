import React, { Component } from "react";

import FullWidthContainer from "components/common/FullWidthContainer";
import HorizontalScroller from "components/common/HorizontalScroller";
import FeaturedSectionSlide from "components/routes/home/FeaturedSectionSlide";
import EventCardContainer from "containers/EventCardContainer";

const SlideSection = FullWidthContainer.withComponent("section");

class EventsSection extends Component {
  componentDidMount() {
    this.props.fetchAudiences();
    this.props.fetchEventsFeatured();
  }

  render() {
    return (
      <SlideSection>
        <HorizontalScroller display={1} hasLoaded={this.props.canDisplayEvents}>
          {this.props.eventsFeatured.map(id => (
            <EventCardContainer
              component={FeaturedSectionSlide}
              id={id}
              key={id}
              audiences={this.props.audiences}
            />
          ))}
        </HorizontalScroller>
      </SlideSection>
    );
  }
}

export default EventsSection;
