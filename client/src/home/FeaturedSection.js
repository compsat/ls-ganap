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

const Link = ({className, route, children}) => (
    <a className={className} href={route}>{children}</a>
);

const StyledLink = styled(Link)`
    width: 100%;
    color: #926C00;
    text-decoration: none;
`;

const DatesContainer = styled.div`
    font-size: 1em;
`;

const DetailsContainer = styled.div`
`;

const DesktopDetails = () => (
    <DesktopDetailsContainer>
        Desktop details
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
                <StyledLink route="">Export</StyledLink><br />
                <StyledLink route="">Read More</StyledLink>
            </LinksSection>
        </TitleContainer>
        <DatesContainer>
            April 7, 2018 (02:00PM - 03:00PM)
        </DatesContainer>
    </MobileDetailsContainer>
);

const DesktopDetailsContainer = styled.div`
    display: none;

    ${media.mdScreen`
        display: block;
    `}
`;

const MobileDetailsContainer = styled.div`
    display: block;

    ${media.mdScreen`
        display: none;
    `}
`;

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