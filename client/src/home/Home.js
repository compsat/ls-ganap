import React, { Component } from 'react';
import CardsSection from './CardsSection';
import styled from 'styled-components';
import FullWidthContainer from '../components/FullWidthContainer';
import PageContent from '../components/PageContent';


const Section = FullWidthContainer.extend`
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
      <Section color="red">
        <PageContent>
          <TitleSection name="Event" show_subtitle="false" />
          <CardsSection api_url="" card_type="profile" cards_display="4"/>
        </PageContent>
      </Section>
      <Section color="blue">
        <PageContent>
          <TitleSection name="Organization" />
          <CardsSection api_url="" card_type="profile" cards_display="5"/>
        </PageContent>
      </Section>
      <Section color="yellow">
        <PageContent>
          <TitleSection name="Office" />
          <CardsSection api_url="" card_type="profile" cards_display="5"/>
        </PageContent>
      </Section>
      </div>
    );
  }
}

export default Home;
