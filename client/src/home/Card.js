import React from 'react';
import MediaCard from '../components/MediaCard.js';

const EventCard = (props) => (
    <MediaCard imgSrc={props.item.photo} imgAlt={props.item.photo_alt}>
        <h2>{props.item.name}</h2>
        <span>{props.item.date}</span>; <span>{props.item.time}</span>
        <p>{props.item.venue}</p>
        <p>{props.item.org}</p>
    </MediaCard>
);

const ProfileCard = (props) => (
    <MediaCard imgSrc={props.item.photo} imgAlt={props.item.photo_alt} imgSize='188px'>
        <h2>{props.item.name}</h2>
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