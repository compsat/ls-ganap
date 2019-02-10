import React, { Component } from 'react';
import styled from 'styled-components';
import animateScrollTo from 'animated-scroll-to'
import theme from '../style/style-theme';
import { media } from '../style/style-utils';
import PageContent from '../common/PageContent';
import ArrowButton from './ArrowButton';

const ScrollerContainer = styled.div`
  ${media.mdScreen`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  `}
`;

const ScrollList = styled(PageContent)`
  ${props => getHorizontalScrollerDisplay(props.display)};
  --item-width: 9em;
  --item-spacing: 1em;

  overflow-x: scroll;
  white-space: nowrap;
  padding: 0 calc((100vw - var(--item-width) - var(--item-spacing))/2);

  ${media.mdScreen`
    --item-width: calc(100%/var(--item-display));

    display: flex;
    padding: 0;
    overflow-x: hidden;
  `}
`;

const ScrollItem = styled.li`
  display: inline-block;
  min-width: var(--item-width);
  padding: 1em calc(var(--item-spacing)/2);
  white-space: initial;
`;

const ScrollerButton = styled(ArrowButton)`
  display: none;

  ${media.mdScreen`
    display: unset;
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    opacity: ${props => props.show ? 1 : 0};
    transition: opacity .25s, visibility .25s;
  `}
`

class HorizontalScroller extends Component {
  constructor(props) {
    super(props);
    this.scrollList = React.createRef();
    this.state = {
      atStart: true,
      atEnd: false,
    }
    this.setState({
      atEnd: (this.scrollList.scrollWidth -
        (this.scrollList.scrollLeft + this.scrollList.clientWidth)) === 0
    });
  }

  componentDidMount() {
    const scrollList = this.scrollList;

    this.animateScrollToOptions = {
      element: scrollList,
      cancelOnUserAction: false,
      horizontal: true,
    }
  }

  handlePrevClick = (e) => {
    const scrollList = this.scrollList;
    const eventTarget = e.target;

    eventTarget.setAttribute("disabled", "");
    this.setState({atEnd: false});

    animateScrollTo(scrollList.scrollLeft - scrollList.clientWidth, Object.assign({
      onComplete: () => {
        eventTarget.removeAttribute("disabled");

        if (scrollList.scrollLeft === 0) {
          this.setState({atStart: true});
        }
      }
    }, this.animateScrollToOptions));
  }

  handleNextClick = (e) => {
    const scrollList = this.scrollList;
    const eventTarget = e.target;

    eventTarget.setAttribute("disabled", "");
    this.setState({atStart: false});

    animateScrollTo(scrollList.scrollLeft + scrollList.clientWidth, Object.assign({
      onComplete: () => {
        eventTarget.removeAttribute("disabled");

        if (scrollList.scrollWidth - (scrollList.scrollLeft + scrollList.clientWidth) === 0) {
          this.setState({atEnd: true});
        }
      }
    }, this.animateScrollToOptions));
  }

  render() {
    const children = this.props.children;

    return (
      <ScrollerContainer>
        <ScrollerButton show={!this.state.atStart} reverse onClick={this.handlePrevClick} />
        <ScrollList innerRef={ref => {this.scrollList = ref}} display={this.props.display}>
          {React.Children.map(children, (child) =>
            <ScrollItem key={child.props.id}>
              {child}
            </ScrollItem>
          )}
        </ScrollList>
        <ScrollerButton show={!this.state.atEnd} onClick={this.handleNextClick} />
      </ScrollerContainer>
    );
  }
}

const getHorizontalScrollerDisplay = (maxDisplay) => {
  const maxSiteWidth = parseInt(theme.sizes.maxSiteWidth, 10)/16;
  const mdScreen = parseInt(theme.breakpoints.mdScreen, 10)/16;
  const minDisplay = 1;
  const interval = (maxSiteWidth - mdScreen)/(maxDisplay - minDisplay);

  let styles = '';
  let display = minDisplay;

  for (let minWidth = mdScreen; minWidth <= maxSiteWidth; minWidth += interval) {
    styles += `
      @media screen and (min-width: ${minWidth}em) {
        --item-display: ${display};
      }
    `
    display++;
  }

  return styles;
}

export default HorizontalScroller;
