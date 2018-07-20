import React, { Component } from 'react';
import Card from './Card.js'
import HorizontalScroller from '../components/HorizontalScroller.js';

class ScrollerSection extends Component {
	constructor(props){
		super(props);
		this.state = {
	    // SAMPLE DATA FOR PROFILE CARDS
		  items:[
        {
          id: 0,
          name: 'Administrative Offices',
          photo: require('../assets/aag.jpg')
        }, {
          id: 1,
          name: 'JGSOM',
          photo: require('../assets/aag.jpg')
        }, {
          id: 2,
          name: 'SOH',
          photo: require('../assets/aag.jpg')
        }, {
          id: 3,
          name: 'SOSE',
          photo: require('../assets/aag.jpg')
        }, {
          id: 4,
          name: 'SOSS',
          photo: require('../assets/aag.jpg')
        }, {
          id: 5,
          name: 'JGSOM',
          photo: require('../assets/aag.jpg')
        }, {
          id: 6,
          name: 'SOH',
          photo: require('../assets/aag.jpg')
        }, {
          id: 7,
          name: 'SOSE',
          photo: require('../assets/aag.jpg')
        }
			],
		
		  // SAMPLE DATA FOR EVENT CARDS			
			items1: [
        {
          id: 0,
          name: 'Arduino Workshop',
          date: 'Mar. 7, 2018',
          time: '17:00-19:00'					,
          venue: 'Faura 323',
          org: 'AESES',
          photo: require('../assets/promos/harana_alac.jpg')
        }, {
          id: 1,
          name: 'Arduino Workshop',
          date: 'Mar. 7, 2018',
          time: '17:00-19:00'					,
          venue: 'Faura 323',
          org: 'AESES',
          photo: require('../assets/promos/harana_alac.jpg')
        },{
          id: 2,
          name: 'Arduino Workshop',
          date: 'Mar. 7, 2018',
          time: '17:00-19:00'					,
          venue: 'Faura 323',
          org: 'AESES',
          photo: require('../assets/promos/harana_alac.jpg')
        },{
          id: 3,
          name: 'Arduino Workshop',
          date: 'Mar. 7, 2018',
          time: '17:00-19:00'					,
          venue: 'Faura 323',
          org: 'AESES',
          photo: require('../assets/promos/harana_alac.jpg')
        }
        ,{
          id: 4,
          name: 'Arduino Workshop',
          date: 'Mar. 7, 2018',
          time: '17:00-19:00'					,
          venue: 'Faura 323',
          org: 'AESES',
          photo: require('../assets/promos/harana_alac.jpg')
        }
        ,{
          id: 5,
          name: 'Arduino Workshop',
          date: 'Mar. 7, 2018',
          time: '17:00-19:00'					,
          venue: 'Faura 323',
          org: 'AESES',
          photo: require('../assets/promos/harana_alac.jpg')
        }
        ,{
          id: 6,
          name: 'Arduino Workshop',
          date: 'Mar. 7, 2018',
          time: '17:00-19:00'					,
          venue: 'Faura 323',
          org: 'AESES',
          photo: require('../assets/promos/harana_alac.jpg')
        }
      ],
      
    }
  }

  componentWillMount(){
    // getInfo(this.props.api_url);
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
