import React, { Component } from "react";

import EventEdit from "components/routes/event/EventEdit";
import EventEditDetailContainer from "containers/event/EventEditDetailContainer";

class EventEditSection extends Component {
  render() {
    return (
      <main>
        {this.props.canDisplayEvents && this.props.eventsSingle && (
          <EventEditDetailContainer
            component={EventEdit}
            id={this.props.eventsSingle}
            audiences={this.props.audiences}
            hosts={this.props.hosts}
            venues={this.props.venues}
            tags={this.props.tags}
            history={this.props.history}
          />
        )}
      </main>
    );
  }
}

export default EventEditSection;
