import React, { Component } from 'react';
import ScrollerSection from './ScrollerSection';
import FeaturedSection from './FeaturedSection';
import styled from 'styled-components';
import FullWidthContainer from '../components/FullWidthContainer';
import PageContent from '../components/PageContent';


const CardsSection = FullWidthContainer.extend`
  background-color: ${props => props.color};
  padding: 2em 0;
`;

const TitleContainer = styled.div`
  width: 90%;
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
  render() {
    return (
      <div>
        <FeaturedSection />
        <CardsSection color="#81C0BB">
          <PageContent>
            <TitleSection name="Upcoming Event" show_subtitle="false" title_color="#F8FFEB"/>
            <ScrollerSection api_url="" card_type="event" cards_display="3"/>
          </PageContent>
        </CardsSection>
        <CardsSection color="#FFE5CB">
          <PageContent>
            <TitleSection name="Organization" title_color="#E09850" subtitle_color="#7E6A56"/>
            <ScrollerSection api_url="" card_type="profile" cards_display="5"/>
          </PageContent>
        </CardsSection>
        <CardsSection color="#945858">
          <PageContent>
            <TitleSection name="Office" title_color="#FEF5EA" subtitle_color="#573030"/>
            <ScrollerSection api_url="" card_type="profile" cards_display="5"/>
          </PageContent>
        </CardsSection>
      </div>
    );
  }
}

export default Home;
