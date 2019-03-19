import React from "react";

import EventCardContainer from "containers/EventCardContainer";
import EventDetailSlide from "components/routes/event/EventDetailSlide";

const EventDetail = (props) => (
  <main>
  	<EventCardContainer 
  	   component={EventDetailSlide} 
  	   id={props.match.params.id} 
  	   key={props.match.params.id} 
  	 />
  </main>
);

export default EventDetail;
