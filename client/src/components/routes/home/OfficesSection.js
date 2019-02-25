import React, { Component } from "react";

import AppCardBase from "components/common/AppCardBase";
import AppCardImage from "components/common/AppCardImage";
import AppCardTextBox from "components/common/AppCardTextBox";
import AppHeading from "components/common/AppHeading";
import AppSubheading from "components/common/AppSubheading";
import AppText from "components/common/AppText";
import PageContent from "components/common/PageContent";
import HorizontalScroller from "components/common/HorizontalScroller";
import CardsSection from "components/routes/home/CardsSection";

const OfficesCardsSection = CardsSection.extend`
  background-color: #dff2cb;
`;

const SectionHeading = AppHeading.withComponent("h2").extend`
  color: #7B8C69;
`;

const SectionSubheading = AppSubheading.withComponent("a").extend`
  display: inline-block;
  margin-bottom: 2rem;
  color: #404937;
  text-decoration: none;
`;

class OfficesSection extends Component {
  componentDidMount() {
    this.props.fetchOffices();
  }

  render() {
    return (
      <OfficesCardsSection>
        <PageContent>
          <SectionHeading size="6">Offices</SectionHeading>
          <SectionSubheading caps={true}>
            Browse Events by Office
          </SectionSubheading>
        </PageContent>
        <HorizontalScroller
          display={5}
          hasLoaded={
            this.props.offices.hasInitiatedFetch &&
            !this.props.offices.isFetching
          }
        >
          {Object.values(this.props.offices.items).map(office => (
            <AppCardBase key={office.id}>
              <AppCardImage
                src={office.logo_url}
                size={"75%"}
                aspectRatio={1}
                alt={office.name}
              />
              <AppCardTextBox lines={3} center={true}>
                <AppText>{office.name}</AppText>
              </AppCardTextBox>
            </AppCardBase>
          ))}
        </HorizontalScroller>
      </OfficesCardsSection>
    );
  }
}

export default OfficesSection;
