import React from 'react';
import MediaCard from '../components/MediaCard.js';
import styled from 'styled-components';

const CardTitle = styled.h1`
    font-family: 'Nirmala Bold', sans-serif;
    font-size: 0.8em;
    color: #6A6A6A;
`;

const CardDetails = styled.h1`
    font-family: 'Nirmala', sans-serif;
    font-size: 0.8em;
    color: #6A6A6A;
`;

const ProfileCardTitle = CardTitle.extend`
    text-align: center;
`;

const EventCard = (props) => (
    <MediaCard imgSrc={props.item.poster_url} imgAlt={props.item.photo_alt}>
        <CardTitle>{props.item.name}</CardTitle>
        <CardDetails>
            <p>{props.item.event_logistics[0].date};  
                {props.item.event_logistics[0].start_time}-{props.item.event_logistics[0].end_time}</p>
            <p>{props.item.event_logistics[0].venue}</p>
            <p>{props.item.host}</p>
        </CardDetails>
    </MediaCard>
);

const ProfileCard = (props) => (
    <MediaCard imgSrc={props.item.logo_url} imgAlt={props.item.photo_alt} imgSize='188px'>
        <ProfileCardTitle>{props.item.name}</ProfileCardTitle>
    </MediaCard>
);

const Card = (props) => {
    if(props.card_type === 'event'){
        return <EventCard item={props.item}/>;
    } else if (props.card_type === 'profile'){
        return <ProfileCard item={props.item}/>;
    } else {
        return;
    }
}

export default Card;