import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchBar from './SearchBar';
import FilterBarContainer from '../containers/FilterBarContainer';
import MediaCard from '../components/MediaCard';
import AppSubheading from '../components/AppSubheading';
import AppText from '../components/AppText';
import { media } from '../style/style-utils';
import SVG from 'react-inlinesvg';

const SearchHeader = styled.header`
  ${media.mdScreen`
    margin-top: 3em;
    margin-bottom: 4em;
  `}
`

const BrowseSearchBar = styled(SearchBar)`
  ${media.mdScreen`
    width: 28em;
    margin: 0 auto;
  `}
`

const MainContentBox = styled.div`
  ${media.mdScreen`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `}
`

const BrowseFilterBar = styled(FilterBarContainer)`
  margin-bottom: 1em;

  ${media.mdScreen`
    flex-direction: column;
    width: 16em;
    min-width: 16em;
    margin-right: 2em;
  `}
`

const EventItemList = styled.ul`
  flex-grow: 1;
`

const SpinnerIcon = styled(SVG)`
  display: block;
  width: 2em;
  margin: 0 auto;
`

const BrowseMediaCard = styled(MediaCard)`
  min-height: 12em;
  margin-bottom: 1em;
`

const MediaCardHostP = AppText.withComponent('p').extend`
  margin-bottom: 1em;
`

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      apiData: {
        event_hosts: [],
        events: [],
        venues: [],
      },
      search: {
        query: '',
        host: '',
        tags: [],
        date: '',
      },
    }
  }

  componentDidMount() {
    const API_URL = 'https://ls-ganap-api.herokuapp.com/';
    const dataKeys = Object.keys(this.state.apiData);
    const requests = dataKeys.map((dataKey) => {
      return axios.get(API_URL + dataKey +
        (dataKey === 'event_hosts' ? '/1' : ''));
    });

    axios.all(requests).then((responses) => {
      responses.forEach((response, index) => {
        this.setState((prevState) => ({
          apiData: {
            ...prevState.apiData,
            [dataKeys[index]]:
              (dataKeys[index] === 'event_hosts'
                ? response.data
                : response.data.results)
          },
          loading: false
        }));
      })
    });
  }

  handleSearchChange = (search) => {
    this.setState((prevState) => ({
      search: {
        ...prevState.search,
        ...search
      }
    }));
  }

  getItem = (arr, id)  => {
    return arr.find((item) => item.id === id);
  }

  renderHosts = (rootHosts) => {
    const hosts = Object.entries(rootHosts).reduce(
      (acc, [rootHost, hosts]) => {
        return [
          ...acc,
          ...hosts.map((hostId) => {
            const hostList = this.state.apiData.event_hosts[rootHost + '_list'];

            return this.getItem(hostList, hostId).name;
          })
        ]
      }
    , []);

    return (
      <MediaCardHostP>{hosts.join(', ')}</MediaCardHostP>
    );
  }

  formatDate(date) {
    const dateObject = new Date(date);
    const dateString = dateObject.toDateString().substr(4);

    return dateString.replace(/ (?=[^ ]*$)/, ', ');
  }

  formatTime(time) {
    const [hours, mins] = time.split(':');
    const timeStringOptions = {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    };
    const timeContainer = new Date();

    timeContainer.setHours(hours, mins);

    return timeContainer.toLocaleTimeString('en-US', timeStringOptions);
  }

  render() {
    return (
      <main>
        <SearchHeader>
          <BrowseSearchBar onQueryChange={this.handleSearchChange}/>
        </SearchHeader>
        <MainContentBox>
          <BrowseFilterBar onFiltersChange={this.handleSearchChange}/>
          {this.state.loading || !this.state.apiData.events ? (
            <SpinnerIcon src={require('../assets/icon-spinner.svg')}/>
          ) : (
            <EventItemList>
              {this.state.apiData.events.map((event) => (
              <li key={event.id}>
                <BrowseMediaCard
                  portrait
                  horizontal
                  imgSrc={event.poster_url}
                  imgAlt={event.name}
                >
                  <AppSubheading size='1'>{event.name}</AppSubheading>
                  {this.renderHosts({
                    org: event.org_hosts,
                    office: event.office_hosts,
                    sanggu: event.sanggu_hosts
                  })}
                  <p>{this.formatDate(event.event_logistics[0].date)}</p>
                  <p>{this.formatTime(event.event_logistics[0].start_time)}</p>
                  {/* <p>{this.getItem(this.state.venues, event.event_logistics[0].venue).name}</p> */}
                  <p>CTC 103</p>
                </BrowseMediaCard>
              </li>))}
            </EventItemList>
          )}
        </MainContentBox>
      </main>
    );
  }
}

export default Browse;
