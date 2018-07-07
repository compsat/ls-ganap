import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import { ThemeProvider } from 'styled-components';
import theme from './Theme';
import MainNav from './components/MainNav';
import PageContent from './components/PageContent';

const Home = Loadable({
  loader: () => import('./home/Home'),
  loading: Loading,
});

const Browse = Loadable({
  loader: () => import('./browse/Browse'),
  loading: Loading,
});

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <div>
            <MainNav />
            <PageContent>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/browse" component={Browse} />
              </Switch>
            </PageContent>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
