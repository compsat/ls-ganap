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

const OrgsCardsSection = CardsSection.extend`
  background-color: #ffe5cb;
`;

const SectionHeading = AppHeading.withComponent("h2").extend`
  color: #E09850;
`;

const SectionSubheading = AppSubheading.withComponent("a").extend`
  margin-bottom: 2rem;
  color: #7E6A56;
  text-decoration: none;
`;

class OrgsSection extends Component {
  componentDidMount() {
    this.props.fetchClusters();
  }

  render() {
    return (
      <OrgsCardsSection>
        <PageContent>
          <SectionHeading size="6" align="right">
            Organizations
          </SectionHeading>
          <SectionSubheading caps={true} align="right">
            Browse Events by Organization
          </SectionSubheading>
        </PageContent>
        <HorizontalScroller
          display={5}
          hasLoaded={
            this.props.clusters.hasInitiatedFetch &&
            !this.props.clusters.isFetching
          }
        >
          {Object.values(this.props.clusters.items).map(cluster => (
            <AppCardBase key={cluster.id}>
              <AppCardImage
                src={cluster.logo_url}
                size={"75%"}
                aspectRatio={1}
                alt={cluster.name}
              />
              <AppCardTextBox lines={3} center={true}>
                <AppText>{cluster.name}</AppText>
              </AppCardTextBox>
            </AppCardBase>
          ))}
        </HorizontalScroller>
      </OrgsCardsSection>
    );
  }
}

export default OrgsSection;
