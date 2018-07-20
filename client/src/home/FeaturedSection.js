import React, {Component} from 'react';
import styled from 'styled-components';
import { media } from '../style/style-utils';
import samplePromo from '../assets/promos/rent_bluerep.jpg';

const FeaturedContainer = styled.div`
    width:80%;
    margin:auto;
    margin-bottom: 2em;

    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-row-gap: 1em;

    ${media.mdScreen`
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 1em;
  `}
`;

const Promo = styled.img`
    width: 100%;
    border-radius: 0.5em;
`;

const TitleContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const TitleSection = styled.div`
    margin-bottom: 1em;
`;

const Title = styled.h1`
    font-size: 2em;
`;

const Subtitle = styled.h2`
    font-size: 1em;
`;

const LinksSection = styled.div`
    text-align: right;
`;

const LinkContainer = styled.div`
    width: 100%;
    font-size: 0.7em;

    ${media.mdScreen`
        margin-top: 2.5em;
    `}
`;

const Link = ({className, route, children}) => (
    <LinkContainer>
        <a className={className} href={route}>{children}</a>
    </LinkContainer>
);


const MobileLink = styled(Link)`
    width: 100%;
    color: #926C00;
    text-decoration: none;
`;

const DesktopLink = styled(Link)`
    background-color: #926C00;
    color: white;
    
    font-family: sans-serif;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1em 2em;
`;

const DesktopLink2 = DesktopLink.extend`
    background-color: white;
    color: #926C00;
`;

const DatesContainer = styled.div`
    font-size: 1em;

    ${media.mdScreen`
        display:grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 1fr 1fr 1fr;
    `}
`;

const DesktopDetailsContainer = styled.div`
    display: none;

    ${media.mdScreen`
        display: grid;
        grid-template-rows: 1fr 1.5fr 1fr;
        height: 100%;
    `}
`;

const MobileDetailsContainer = styled.div`
    display: block;

    ${media.mdScreen`
        display: none;
    `}
`;

const DetailsContainer = styled.div``;

const Heading = styled.div``;
const Content = styled.div``;

const DesktopDetails = () => (
    <DesktopDetailsContainer>
        <TitleSection>
            <Title>Rent</Title>
            <Subtitle>by blueREP</Subtitle>
        </TitleSection>
        <DatesContainer>
            <Heading>Date/Time:</Heading>
            <Content>April 7, 2018 (02:00PM - 03:00PM)</Content>
            <Heading>Venue:</Heading>
            <Content>Rizal Mini Theatre, Ateneo de Manila University</Content>
            <Heading>Ticket Prices:</Heading>
            <Content>AP400 (Regular price) <br />P350 (Student discount)</Content>
        </DatesContainer>
        <LinksSection>
            <DesktopLink route="">Export to Calendar</DesktopLink>
            <DesktopLink2 route="">Read More about Rent</DesktopLink2>
        </LinksSection>
    </DesktopDetailsContainer>
);

const MobileDetails = () => (
    <MobileDetailsContainer>
        <TitleContainer>
            <TitleSection>
                <Title>Rent</Title>
                <Subtitle>by blueREP</Subtitle>
            </TitleSection>
            <LinksSection>
                <MobileLink route="">Export</MobileLink><br />
                <MobileLink route="">Read More</MobileLink>
            </LinksSection>
        </TitleContainer>
        <DatesContainer>
            April 7, 2018 (02:00PM - 03:00PM)
        </DatesContainer>
    </MobileDetailsContainer>
);

class FeaturedSection extends Component {

    render() {
        return(
            <FeaturedContainer>
                <Promo src={samplePromo} alt= "" />
                <DetailsContainer>
                    <DesktopDetails />
                    <MobileDetails />
                </DetailsContainer>
            </FeaturedContainer>
        );
    }
}

export default FeaturedSection;