import React from 'react';
import AppCardBase from '../common/AppCardBase';
import AppCardImage from '../common/AppCardImage';
import AppCardTextBox from '../common/AppCardTextBox';
import FeaturedCard from './FeaturedCard'
import styled from 'styled-components';

const CardTitle = styled.h1`
    font-family: 'Nirmala UI', sans-serif;
    font-weight: 800;
    font-size: 0.8em;
    color: #6A6A6A;
`;

const CardDetails = styled.h1`
    font-family: 'Nirmala UI', sans-serif;
    font-size: 0.8em;
    color: #6A6A6A;
`;

const ProfileCardTitle = CardTitle.extend`
    text-align: center;
`;

const EventCard = (props) => (
    <AppCardBase>
        <AppCardImage
            src={props.item.poster_url}
            aspectRatio={4/3}
            alt={props.item.photo_alt}
        />
        <AppCardTextBox lines="5">
            <CardTitle>{props.item.name}</CardTitle>
            <CardDetails>
                <p>{props.item.event_logistics[0].date};
                    {props.item.event_logistics[0].start_time}-{props.item.event_logistics[0].end_time}</p>
                <p>{props.item.event_logistics[0].venue}</p>
                <p>{props.item.all_hosts.join(', ')}</p>
            </CardDetails>
        </AppCardTextBox>
    </AppCardBase>
);

const ProfileCard = (props) => (
    <AppCardBase>
        <AppCardImage
            src={props.item.logo_url}
            size={"75%"}
            aspectRatio={1}
            alt={props.item.photo_alt}
        />
        <AppCardTextBox lines="3">
            <ProfileCardTitle>{props.item.name}</ProfileCardTitle>
        </AppCardTextBox>
    </AppCardBase>
);

const Card = (props) => {
    if(props.card_type === 'event'){
        return <EventCard item={props.item}/>;
    } else if (props.card_type === 'profile'){
        return <ProfileCard item={props.item}/>;
    } else if (props.card_type === 'featured'){
        return <FeaturedCard item={props.item}/>;
    } else {
        return <div>Failed to load events.</div>;
    }
}

export default Card;