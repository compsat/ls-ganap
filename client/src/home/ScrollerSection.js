import React, { Component } from 'react';
import Card from './Card.js'
import HorizontalScroller from '../components/HorizontalScroller.js';
import axios from 'axios'

class ScrollerSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
    }
  }

  formatEvents = (events, orgs, sanggu, offices, venues) => {
    var temp_items = []
    for(var event_key in events){
      var event = events[event_key]

      if (event) { // if event exists
        // Change org ID to org name for each org_host
        for (var orgId_key in event.org_hosts){
          var orgId = event.org_hosts[orgId_key]
          event.org_hosts[orgId_key] = this.props.orgs[orgId].name
        }

        // Change sanggu ID to org name for each sanggu_host
        for (var sangguId_key in event.sanggu_hosts){
          var sangguId = event.sanggu_hosts[sangguId_key]
          event.sanggu_hosts[sangguId_key] = this.props.sanggu[sangguId].name
        }

        // Change sanggu ID to org name for each sanggu_host
        for (var officeId_key in event.office_hosts){
          var officeId = event.office_hosts[officeId_key]
          event.office_hosts[officeId_key] = this.props.offices[officeId].name 
        }

        // Format each in event_logistics
        for (var logId_key in event.event_logistics){
          var event_logistic = event.event_logistics[logId_key]

          var date = new Date(event_logistic.date)
          event_logistic.date = date.toLocaleDateString("en-US", {month: 'short', day: 'numeric', year: 'numeric'})
          event_logistic.start_time = (event_logistic.start_time).slice(0,5)
          event_logistic.end_time = (event_logistic.end_time).slice(0,5)
          var venue = this.props.venues[event_logistic.venue]
          event_logistic.venue = venue ? venue.name : event_logistic.outside_venue_name
        }

        temp_items.push(event);
        
      }
    }

    return temp_items

  }

  componentDidMount(){
    if (this.props.name === 'featured'){
      var featured_events = this.props.featured_events
      var items = this.formatEvents(featured_events, this.props.orgs, this.props.sanggu, this.props.offices, this.props.venues)
      this.setState({ items });
    }

    if (this.props.name === 'events'){
      var events = this.props.events
      var items = this.formatEvents(events, this.props.orgs, this.props.sanggu, this.props.offices, this.props.venues)
      this.setState({ items });
    }
    
    if (this.props.name === 'orgs') {
      var orgs = this.props.orgs
      var items = []
      for(var org_key in orgs) {
        items.push(orgs[org_key]);
      }
      this.setState({ items });
    } 

    if (this.props.name === 'offices') {
      var offices = this.props.offices
      var items = []
      for(var offices_key in offices) {
        items.push(offices[offices_key])
      }
      this.setState({ items });
    } 
  }

  render() {
    return(
      <HorizontalScroller display={this.props.cards_display}>
        {this.state.items.map(item => (
          <Card 
            key={item.id} 
            item={item} 
            card_type={this.props.card_type} />
        ))}
      </HorizontalScroller>
    );
  }
}

export default ScrollerSection;
