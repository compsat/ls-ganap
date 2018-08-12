import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import { ThemeProvider } from 'styled-components';
import theme from './style/style-theme';
import MainNav from './components/MainNav';
import PageContent from './components/PageContent';
import Footer from './components/Footer';

const Home = Loadable({
  loader: () => import('./home/Home'),
  loading: Loading,
});

const Browse = Loadable({
  loader: () => import('./browse/Browse'),
  loading: Loading,
});

const MainContent = PageContent.extend`
  padding-top: ${props => props.theme.sizes.navHeight};
`

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <MainNav />
            <MainContent>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/browse" component={Browse} />
              </Switch>
            </MainContent>
            <Footer />
          </React.Fragment>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
