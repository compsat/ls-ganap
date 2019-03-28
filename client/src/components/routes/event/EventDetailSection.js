import React, { Component } from "react";

import EventDetailSlide from "components/routes/event/EventDetailSlide";
import EventCardContainer from "containers/EventCardContainer";

class EventDetailSection extends Component {
  componentDidMount() {
    this.props.fetchEventsSingle();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.eventsSingle.map(id => (
          <EventCardContainer
            component={EventDetailSlide}
            id={this.props.id}
            key={this.props.id}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default EventDetailSection;
