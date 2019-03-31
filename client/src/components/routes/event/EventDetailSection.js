import React, { Component } from "react";

import EventDetailSlide from "components/routes/event/EventDetailSlide";
import EventCardContainer from "containers/EventCardContainer";

class EventDetailSection extends Component {
  componentDidMount() {
    this.props.fetchEventsSingle();
  }

  render() {
    return (
      <main>
        {this.props.canDisplayEvents && this.props.eventsSingle && (
          <EventCardContainer
            component={EventDetailSlide}
            id={this.props.eventsSingle}
          />
        )}
      </main>
    );
  }
}

export default EventDetailSection;
