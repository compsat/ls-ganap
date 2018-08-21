import React, { Component } from 'react';
import ScrollerSection from './ScrollerSection';
import FeaturedItem from './FeaturedSection';
import styled from 'styled-components';
import FullWidthContainer from '../components/FullWidthContainer';
import PageContent from '../components/PageContent';
import HorizontalScroller from '../components/HorizontalScroller.js';
import axios from 'axios'


const CardsSection = FullWidthContainer.extend`
  background-color: ${props => props.color};
  padding: 2em 0;
`;

const TitleContainer = styled.div`
  width: 75%;
  margin: auto;
`;

const MainTitle = styled.h1`
  font-family: 'Calluna', serif;
  font-weight: 800;
  font-size: 2.5em;
  color: ${props => props.color};
  margin-bottom: 0.2em;
`;

const Subtitle = styled.h2`
  font-family: 'Quatro', sans-serif;
  text-transform: uppercase;
  color: ${props => props.color};

  display:${props => props.show ? 'none' : 'block'};
`;

const TitleSection = (props) => (
  <TitleContainer>
    <MainTitle color={props.title_color}>{props.name}s</MainTitle>
    <Subtitle color={props.subtitle_color} show={props.show_subtitle}>Browse more {props.name} events</Subtitle>
  </TitleContainer>
)

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      venues: {},
      event_hosts: {}
    }
  }

  componentWillMount(){
    var venues_url = 'http://ls-ganap-api.herokuapp.com/venues/'
    var event_hosts_url = 'http://ls-ganap-api.herokuapp.com/event_hosts/'

    axios.all([
      axios.get(venues_url),
      axios.get(event_hosts_url),
    ])
    .then(axios.spread((venuesRes, eventHostsRes) => {
      var venuesData = venuesRes.data.results
      var eventHostsData = eventHostsRes.data.results

      for (var key in venuesData){
        var venues = {}
        venues[venuesData[key].id] = venuesData[key]
        this.setState({ venues });
      }

      for (var key in eventHostsData){
        var event_hosts = {}
        event_hosts[eventHostsData[key].id] = eventHostsData[key]
        this.setState({ event_hosts });
      }

      console.log('BEFORE this.state: ', this.state)
    }).bind(this));

    console.log('AFTER this.state: ', this.state)
  }

  render() {
    return (
      <div>
        <HorizontalScroller display="1">
          <FeaturedItem />
          <FeaturedItem />
          <FeaturedItem />
        </HorizontalScroller>
        <CardsSection color="#81C0BB">
          <PageContent>
            <TitleSection name="Upcoming Event" show_subtitle="false" title_color="#F8FFEB"/>
            <ScrollerSection 
              api_url="http://ls-ganap-api.herokuapp.com/events/" 
              card_type="event" 
              cards_display="4"
              event_hosts={this.state.event_hosts} 
              venues={this.state.venues} />
          </PageContent>
        </CardsSection>
        <CardsSection color="#FFE5CB">
          <PageContent>
            <TitleSection name="Organization" title_color="#E09850" subtitle_color="#7E6A56"/>
            <ScrollerSection 
              api_url="http://ls-ganap-api.herokuapp.com/clusters/" 
              card_type="profile" 
              cards_display="5" 
              event_hosts={this.state.event_hosts} 
              venues={this.state.venues} />
          </PageContent>
        </CardsSection>
        <CardsSection color="#945858">
          <PageContent>
            <TitleSection name="Office" title_color="#FEF5EA" subtitle_color="#573030"/>
            <ScrollerSection 
              api_url="" 
              card_type="profile" 
              cards_display="5" 
              event_hosts={this.state.event_hosts} 
              venues={this.state.venues} />
          </PageContent>
        </CardsSection>
      </div>
    );
  }
}

export default Home;
