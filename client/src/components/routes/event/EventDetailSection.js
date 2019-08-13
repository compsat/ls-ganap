import React, { Component } from "react";

import EventDetailSlide from "components/routes/event/EventDetailSlide";
import EventCardContainer from "containers/EventCardContainer";

class EventDetailSection extends Component {
  componentDidMount() {
    this.props.fetchAudiences();
    this.props.fetchEventsSingle();
  }

  render() {
    return (
      <main>
        {this.props.canDisplayEvents && this.props.eventsSingle && (
          <EventCardContainer
            component={EventDetailSlide}
            id={this.props.eventsSingle}
            audiences={this.props.audiences}
          />
        )}
      </main>
    );
  }
}

export default EventDetailSection;
