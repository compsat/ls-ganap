import React, { Component } from "react";
import styled from "styled-components";

import Loading from "components/common/Loading";
import PageContent from "components/common/PageContent";
import theme from "style/style-theme";
import { media } from "style/style-utils";

const ScrollerContainer = styled.div`
  ${media.mdScreen`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0;
  `}
`;

const ScrollList = styled(PageContent)`
  ${props => getHorizontalScrollerDisplay(props.display)};
  --item-width: 9em;
  --item-spacing: ${props => props.gutter || "2em"};

  overflow-x: scroll;
  white-space: nowrap;
  padding: 0 calc((100vw - var(--item-width) - var(--item-spacing)) / 2);

  ${media.mdScreen`
    --item-width: calc(100%/var(--item-display));

    display: flex;
    padding: 0;
    margin-left: 0;
    margin-right: 0;
    overflow-x: hidden;
  `}
`;

const ScrollItem = styled.li`
  display: inline-block;
  width: var(--item-width);
  min-width: var(--item-width);
  padding: 1em calc(var(--item-spacing) / 2);
  white-space: initial;
`;

class HorizontalScroller extends Component {
  constructor(props) {
    super(props);
    this.scrollList = React.createRef();
    this.state = {
      atStart: true,
      atEnd: false
    };
    this.setState({
      atEnd:
        this.scrollList.scrollWidth -
          (this.scrollList.scrollLeft + this.scrollList.clientWidth) ===
        0
    });
  }

  componentDidMount() {
    const scrollList = this.scrollList;

    this.animateScrollToOptions = {
      element: scrollList,
      cancelOnUserAction: false,
      horizontal: true
    };
  }

  render() {
    const children = this.props.children;

    return (
      <ScrollerContainer>
        <ScrollList
          innerRef={ref => {
            this.scrollList = ref;
          }}
          display={this.props.display}
          gutter={this.props.gutter}
        >
          {this.props.hasLoaded ||
          typeof this.props.hasLoaded === "undefined" ? (
            React.Children.map(children, child => (
              <ScrollItem key={child.props.id}>{child}</ScrollItem>
            ))
          ) : (
            <Loading />
          )}
        </ScrollList>
      </ScrollerContainer>
    );
  }
}

const getHorizontalScrollerDisplay = maxDisplay => {
  const maxSiteWidth = parseInt(theme.sizes.maxSiteWidth, 10) / 16;
  const mdScreen = parseInt(theme.breakpoints.mdScreen, 10) / 16;
  const minDisplay = 1;
  const interval = (maxSiteWidth - mdScreen) / (maxDisplay - minDisplay);

  let styles = "";
  let display = minDisplay;

  for (
    let minWidth = mdScreen;
    minWidth <= maxSiteWidth;
    minWidth += interval
  ) {
    styles += `
      @media screen and (min-width: ${minWidth}em) {
        --item-display: ${display};
      }
    `;
    display++;
  }

  return styles;
};

export default HorizontalScroller;
