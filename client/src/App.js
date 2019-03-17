import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import Footer from "components/common/Footer";
import Loading from "components/common/Loading";
import MainNav from "components/common/MainNav";
import PageContent from "components/common/PageContent";
import rootReducer from "reducers";
import theme from "style/style-theme";

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

const Home = Loadable({
  loader: () => import("components/routes/home/Home"),
  loading: Loading
});

const Browse = Loadable({
  loader: () => import("containers/browse/BrowseContainer"),
  loading: Loading
});

const EventDetail = Loadable({
  loader: () => import("components/routes/event/EventDetail"),
  loading: Loading,
});

const MainContent = PageContent.extend`
  padding-top: ${props => props.theme.sizes.navHeight};
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <MainNav />
              <MainContent>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/browse" component={Browse} />
                  <Route path="/events/:id" component={EventDetail} />
                </Switch>
              </MainContent>
              <Footer />
            </React.Fragment>
          </ThemeProvider>
        </Provider>
      </Router>
    );
  }
}

export default App;
