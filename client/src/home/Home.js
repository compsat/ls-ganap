import React, { Component } from 'react';
import ScrollerSection from './ScrollerSection';
import FeaturedSection from './FeaturedSection';
import styled from 'styled-components';
import FullWidthContainer from '../components/FullWidthContainer';
import PageContent from '../components/PageContent';


const CardsSection = FullWidthContainer.extend`
  background-color: ${props => props.color};
`;

const TitleContainer = styled.div`
  width: 90%;
`;

const MainTitle = styled.h1`
  font-family: serif;
  font-size: 2em;
  margin-bottom: 0.2em;
`;

const Subtitle = styled.h2`
  font-family: serif;
  text-transform: uppercase;

  display:${props => props.show ? 'none' : 'block'};
`;

const TitleSection = (props) => (
  <TitleContainer>
    <MainTitle>{props.name}s</MainTitle>
    <Subtitle show={props.show_subtitle}>Browse more {props.name} events</Subtitle>
  </TitleContainer>
)

class Home extends Component {
  render() {
    return (
      <div>
        <FeaturedSection />
        <CardsSection color="#81C0BB">
          <PageContent>
            <TitleSection name="Upcoming Event" show_subtitle="false" />
            <ScrollerSection api_url="" card_type="event" cards_display="4"/>
          </PageContent>
        </CardsSection>
        <CardsSection color="#FFE5CB">
          <PageContent>
            <TitleSection name="Organization" />
            <ScrollerSection api_url="" card_type="profile" cards_display="5"/>
          </PageContent>
        </CardsSection>
        <CardsSection color="#945858">
          <PageContent>
            <TitleSection name="Office" />
            <ScrollerSection api_url="" card_type="profile" cards_display="5"/>
          </PageContent>
        </CardsSection>
      </div>
    );
  }
}

export default Home;
