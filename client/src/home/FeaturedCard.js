import React from 'react';
import styled from 'styled-components';
import { media } from '../style/style-utils';

const FeaturedContainer = styled.div`
    width:80%;
    margin:auto;
    margin-bottom: 2em;

    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-row-gap: 1em;

    ${media.mdScreen`
        width:100%;
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
    margin-bottom: 1em;
`;

const TitleSection = styled.div`
    font-family: 'Calluna', serif;
`;

const Title = styled.h1`
    font-weight: 800;
    font-size: 2em;
    color: #141414;

    ${media.mdScreen`
        font-size: 2.5em;
        margin-top: 1em;
    `}
`;

const Subtitle = styled.h2`
    font-size: 1em;
    font-weight: 600;
    font-style: italic;
    color: #926C00;


    ${media.mdScreen`
        margin-top: 1em;
        margin-bottom: 1em;
    `}
`;

const LinksSection = styled.div`
    font-family: 'Quatro', sans-serif;
    text-align: right;
    text-transform: uppercase;
`;

const LinkContainer = styled.div`
    width: 100%;
    font-size: 0.7em;
    margin-top: 0.5em;

    ${media.mdScreen`
        font-family: 'Quatro', sans-serif;
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
    background-color: transparent;
    color: #926C00;
`;

const LogDetailsContainer = styled.div`
    font-family: 'Nirmala', sans-serif;
    font-size: 1em;

    ${media.mdScreen`
        display:grid;
        grid-template-columns: 1fr 2fr;
        ${'' /* grid-template-rows: 1fr 1fr 1fr; */}
        grid-template-rows: 1fr 1fr;
    `}
`;

const DesktopDetailsContainer = styled.div`
    display: none;

    ${media.mdScreen`
        display: grid;
        grid-template-rows: 1fr 1.5fr 1fr;
        height: 100%;
        color: #141414;
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

const DesktopDetails = (props) => (
    <DesktopDetailsContainer>
        <TitleSection>
            <Title>{props.item.name}</Title>
            <Subtitle>by {props.item.all_hosts.join(', ')}</Subtitle>
        </TitleSection>
        <LogDetailsContainer>
            <Heading>Date/Time:</Heading>
            <Content>{props.item.event_logistics[0].date} ({props.item.event_logistics[0].start_time}-{props.item.event_logistics[0].end_time})</Content>
            <Heading>Venue:</Heading>
            <Content>{props.item.event_logistics[0].venue}</Content>
            {/* Add link here if there are more than one venues */}
        </LogDetailsContainer>
        <LinksSection>
            <DesktopLink route="">Export to Calendar</DesktopLink>
            <DesktopLink2 route="">Read More about the event</DesktopLink2>
        </LinksSection>
    </DesktopDetailsContainer>
);

const MobileDetails = (props) => (
    <MobileDetailsContainer>
        <TitleContainer>
            <TitleSection>
                <Title>{props.item.name}</Title>
                <Subtitle>by {props.item.all_hosts.join(', ')}</Subtitle>
            </TitleSection>
            <LinksSection>
                <MobileLink route="">Export</MobileLink>
                <MobileLink route="">Read More</MobileLink>
            </LinksSection>
        </TitleContainer>
        <LogDetailsContainer>
        {props.item.event_logistics[0].date} ({props.item.event_logistics[0].start_time}-{props.item.event_logistics[0].end_time})
        </LogDetailsContainer>
    </MobileDetailsContainer>
);

const FeaturedCard = (props) => (
    <FeaturedContainer>
        <Promo src={props.item.poster_url} alt={props.item.photo_alt} />
        <DetailsContainer>
            <DesktopDetails item={props.item}/>
            <MobileDetails item={props.item}/>
        </DetailsContainer>
    </FeaturedContainer>
)

export default FeaturedCard;