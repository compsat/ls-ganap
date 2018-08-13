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
    var url = this.props.api_url
    axios.get(url,{
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      data: {}
    })
      .then(function(response) {
        let results = response.data.results
        for (var key in results){
          this.setState(prevState => ({
            items: prevState.items.concat(results[key])
          }));
          console.log(this.state.items)
        }
      }.bind(this))
  }

  render() {
    return(
      <HorizontalScroller display={this.props.cards_display}>
        {this.state.items.map(item => (
          <Card item={item} card_type={this.props.card_type} />
        ))}
      </HorizontalScroller>
    );
  }
}

export default ScrollerSection;
