import React, { Component } from "react";

import FullWidthContainer from "components/common/FullWidthContainer";
import EventHorizontalScroller from "components/routes/event/EventHorizontalScroller";
import EventDetailSlide from "components/routes/event/EventDetailSlide";
import EventCardContainer from "containers/EventCardContainer";

const SlideSection = FullWidthContainer.withComponent("section").extend`

`;

class EventDetailSection extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <SlideSection>
        {console.log(this.props)}
        <EventHorizontalScroller display={1} hasLoaded={this.props.canDisplayEvents}>
          <EventCardContainer
            component={EventDetailSlide}
            id={this.props.eventId}
            key={this.props.eventId}
          />
        </EventHorizontalScroller>
      </SlideSection>
    );
  }
}

export default EventDetailSection;
