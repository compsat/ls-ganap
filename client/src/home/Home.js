import React, { Component } from 'react';
import ScrollerSection from './ScrollerSection';
import styled from 'styled-components';
import FullWidthContainer from '../common/FullWidthContainer';
import PageContent from '../common/PageContent';
import Loading from '../common/Loading';
import axios from 'axios'
import { media } from '../style/style-utils';


const CardsSection = styled.div`
  background-color: ${props => props.color};
  padding: 4em 0;

  ${media.mdScreen`
    margin-left: calc((100% - 100vw)/2);
    margin-right: calc((100% - 100vw)/2);
  `}
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
  <PageContent>
    <MainTitle color={props.title_color}>{props.name}s</MainTitle>
    <Subtitle color={props.subtitle_color} show={props.show_subtitle}>Browse more {props.name} events</Subtitle>
  </PageContent>
)

function FeaturedSection(props) {
  const isLoaded = props.state.venues && props.state.orgs && props.state.sanggu && props.state.offices && props.state.featured_events;
  if (isLoaded) {
    return (
      <ScrollerSection
        name="featured"
        card_type="featured"
        cards_display="1"
        featured_events={props.state.featured_events}
        venues={props.state.venues}
        orgs={props.state.orgs}
        sanggu={props.state.sanggu}
        offices={props.state.offices} />
    );
  }
  return (<Loading />);
}

function EventsSection(props) {
  const isLoaded = props.state.venues && props.state.orgs && props.state.sanggu && props.state.offices && props.state.events;
  if (isLoaded) {
    return (
      <ScrollerSection
        name="events"
        card_type="event"
        cards_display="3"
        events={props.state.events}
        venues={props.state.venues}
        orgs={props.state.orgs}
        sanggu={props.state.sanggu}
        offices={props.state.offices} />
    );
  }
  return (<Loading />);
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
  return (<Loading />);
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
  return (<Loading />);
}

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount(){
    var venues_url = '/venues'
    var orgs_url = '/orgs'
    var sanggu_url = '/sanggu'
    var offices_url = '/offices'
    var events_url = '/events'
    var featured_events_url = '/events'

    axios.all([
      axios.get(venues_url),
      axios.get(orgs_url),
      axios.get(sanggu_url),
      axios.get(offices_url),
      axios.get(events_url),
      axios.get(featured_events_url),
    ])
    .then(axios.spread((venuesRes, orgsRes, sangguRes, officesRes, eventsRes, featuredEventsRes) => {
      var venuesData = venuesRes.data.results
      var orgsData = orgsRes.data.results
      var sangguData = sangguRes.data.results
      var officesData = officesRes.data.results
      var eventsData = eventsRes.data.results
      var featuredEventsData = featuredEventsRes.data.results

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

      var featured_events = {}
      for (var i = 0 ; i <= 5; i++) {
        featured_events[featuredEventsData[i].id] = featuredEventsData[i]
      }
      this.setState({ featured_events });

    }).bind(this));

  }

  render() {
    return (
      <div>
        <FeaturedSection state={this.state} />
        <CardsSection color="#81C0BB">
          <TitleSection name="Upcoming Event" show_subtitle="false" title_color="#F8FFEB"/>
          <EventsSection state={this.state} />
        </CardsSection>
        <CardsSection color="#FFE5CB">
          <TitleSection name="Organization" title_color="#E09850" subtitle_color="#7E6A56"/>
          <OrgsSection orgs={this.state.orgs} />
        </CardsSection>
        <CardsSection color="#945858">
          <TitleSection name="Office" title_color="#FEF5EA" subtitle_color="#573030"/>
          <OfficesSection offices={this.state.offices} />
        </CardsSection>
      </div>
    );
  }
}

export default Home;
