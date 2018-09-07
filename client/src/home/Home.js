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

function EventsSection(props) {
  const isLoaded = props.state.venues && props.state.orgs && props.state.sanggu && props.state.offices && props.state.events;
  if (isLoaded) {
    return (
      <ScrollerSection 
        name="events"
        card_type="event" 
        cards_display="4" 
        events={props.state.events}
        venues={props.state.venues} 
        orgs={props.state.orgs}
        sanggu={props.state.sanggu} 
        offices={props.state.offices} />
    );
  }
  return (<div>Loading...</div>);
}

function OrgsSection(props) {
  const isLoaded = props.orgs;
  if (isLoaded) {
    return (
      <ScrollerSection
        name="orgs"
        card_type="profile" 
        cards_display="5" 
        orgs={props.orgs} />
    );
  }
  return (<div>Loading...</div>);
}

function OfficesSection(props) {
  const isLoaded = props.offices;
  if (isLoaded) {
    return (
      <ScrollerSection
        name="offices"
        card_type="profile" 
        cards_display="5" 
        offices={props.offices} />
    );
  }
  return (<div>Loading...</div>);
}

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      // venues: {},
      // orgs: {},
      // sanggu: {},
      // offices: {},
      // events: {}
    }
  }

  componentWillMount(){
    var venues_url = 'http://ls-ganap-api.herokuapp.com/venues/'
    var orgs_url = 'http://ls-ganap-api.herokuapp.com/orgs/'
    var sanggu_url = 'http://ls-ganap-api.herokuapp.com/sanggu/'
    var offices_url = 'http://ls-ganap-api.herokuapp.com/offices/'
    var events_url = 'http://ls-ganap-api.herokuapp.com/events/'

    axios.all([
      axios.get(venues_url),
      axios.get(orgs_url),
      axios.get(sanggu_url),
      axios.get(offices_url),
      axios.get(events_url)
    ])
    .then(axios.spread((venuesRes, orgsRes, sangguRes, officesRes, eventsRes) => {
      var venuesData = venuesRes.data.results
      var orgsData = orgsRes.data.results
      var sangguData = sangguRes.data.results
      var officesData = officesRes.data.results
      var eventsData = eventsRes.data.results


      var venues = {}
      for (var key in venuesData){
        venues[venuesData[key].id] = venuesData[key]
      }
      this.setState({ venues });

      var orgs = {}
      for (var key in orgsData){
        orgs[orgsData[key].id] = orgsData[key]
      }
      this.setState({ orgs });

      var sanggu = {}
      for (var key in sangguData){
        sanggu[sangguData[key].id] = sangguData[key]
      }
      this.setState({ sanggu });

      var offices = {}
      for (var key in officesData){
        offices[officesData[key].id] = officesData[key]
      }
      this.setState({ offices });

      var events = {}
      for (var key in eventsData){
        events[eventsData[key].id] = eventsData[key]
      }
      this.setState({ events });

    }).bind(this));

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
            <EventsSection state={this.state} />
          </PageContent>
        </CardsSection>
        <CardsSection color="#FFE5CB">
          <PageContent>
            <TitleSection name="Organization" title_color="#E09850" subtitle_color="#7E6A56"/>
            <OrgsSection orgs={this.state.orgs} />
          </PageContent>
        </CardsSection>
        <CardsSection color="#945858">
          <PageContent>
            <TitleSection name="Office" title_color="#FEF5EA" subtitle_color="#573030"/>
            <OfficesSection offices={this.state.offices} />
          </PageContent>
        </CardsSection>
      </div>
    );
  }
}

export default Home;
