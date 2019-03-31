import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import Footer from "components/common/Footer";
import Loading from "components/common/Loading";
import MainNav from "components/common/MainNav";
import PageContent from "components/common/PageContent";
import theme from "style/style-theme";

const Home = Loadable({
  loader: () => import("components/routes/home/Home"),
  loading: Loading
});

const Browse = Loadable({
  loader: () => import("containers/browse/BrowseContainer"),
  loading: Loading
});

const EventDetail = Loadable({
  loader: () => import("containers/event/EventDetailSectionContainer"),
  loading: Loading
});

const Login = Loadable({
  loader: () => import("containers/login/LoginContainer"),
  loading: Loading
});

const MainContent = PageContent.extend`
  padding-top: ${props => props.theme.sizes.navHeight};
`;

class App extends Component {
  componentDidMount() {
    this.props.verifyAuthToken();
  }

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
                <Route path="/login" component={Login} />
                <Route path="/events/:id" component={EventDetail} />
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
