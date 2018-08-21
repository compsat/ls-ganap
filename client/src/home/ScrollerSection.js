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

  componentDidMount(){
    var events_url = this.props.api_url
    
    axios.get(events_url)
    .then(function(response) {
      var results = null
      if (response.data.results){ // has pagination
        results = response.data.results
        console.log(results)
      } else if (response.data instanceof Array){ // no pagination
        results = response.data
      }


      // Add results to this.state
      for (var key in results){
        var item = results[key]

        // Format data for events
        if (this.props.card_type === 'event'){
          for (var key in item.event_logistics){
            // Change venue ID to venue name
            var venueId = item.event_logistics[key].venue
            item.event_logistics[key].venue = this.props.venues[venueId].name

            // Format date
            var date = new Date(item.event_logistics[key].date)
            item.event_logistics[key].date = date.toLocaleDateString("en-US", {month: 'short', day: 'numeric', year: 'numeric'})

            // Format time
            item.event_logistics[key].start_time = (item.event_logistics[key].start_time).slice(0, 5)
            item.event_logistics[key].end_time = (item.event_logistics[key].end_time).slice(0, 5)
          }
          // Change host ID to event_host name
          var hostId = item.host
          item.host = this.props.event_hosts[hostId].name
        }

        this.setState(prevState => ({
          items: prevState.items.concat(item)
        }));
        console.log('item', item)
      }

    }.bind(this))

  }

  render() {
    return(
      <HorizontalScroller display={this.props.cards_display}>
        {this.state.items.map(item => (
          <Card 
            key={item.id} 
            item={item} 
            card_type={this.props.card_type} 
            venues={this.props.venues}
            event_hosts={this.props.event_hosts} />
        ))}
      </HorizontalScroller>
    );
  }
}

export default ScrollerSection;
