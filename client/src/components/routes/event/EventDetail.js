import React from "react";

import EventDetailContainer from "containers/event/EventDetailContainer";

const EventDetail = (props) => (
  <main>
    <EventDetailContainer eventId={props.match.params.id}/>
  </main>
);

export default EventDetail;
