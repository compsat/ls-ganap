import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from "redux-logger";
import rootReducer from 'reducers';
import Loadable from 'react-loadable';
import Loading from 'components/common/Loading';
import { ThemeProvider } from 'styled-components';
import theme from 'style/style-theme';
import MainNav from 'components/common/MainNav';
import PageContent from 'components/common/PageContent';
import Footer from 'components/common/Footer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

const Home = Loadable({
  loader: () => import('components/routes/home/Home'),
  loading: Loading,
});

const Browse = Loadable({
  loader: () => import('containers/browse/BrowseContainer'),
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
                <Provider store={store}>
                  <Route path="/browse" component={Browse} />
                </Provider>
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
