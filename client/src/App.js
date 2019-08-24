import React, { Component } from "react";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import Footer from "components/common/Footer";
import Loading from "components/common/Loading";
import MainNav from "components/common/MainNav";
import PageContent from "components/common/PageContent";
import PrivateRoute from "components/routes/PrivateRoute";
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

const EventEdit = Loadable({
  loader: () => import("containers/event/EventEditSectionContainer"),
  loading: Loading
});

const Login = Loadable({  
  loader: () => import("containers/login/LoginContainer"),
  loading: Loading
});

const GoogleLogin = Loadable({
  loader: () => import("containers/login/GoogleLoginButtonContainer"),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import("containers/dashboard/DashboardContainer"),
  loading: Loading
});

const NewEvent = Loadable({
  loader: () => import("containers/events/NewEventContainer"),
  loading: Loading
});

const MainContent = PageContent.extend`
  padding-top: ${props => props.theme.sizes.navHeight};
`;

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById("jss-insertion-point")
});

class App extends Component {
  componentDidMount() {
    this.props.verifyAuthToken();
  }

  render() {
    return (
      <Router>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <MainNav isAuthenticated={this.props.isAuthenticated} userId={this.props.userId}/>
              <MainContent>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/browse" component={Browse} />
                  <Route path="/login" component={GoogleLogin} />
                  <PrivateRoute
                    path="/dashboard"
                    component={Dashboard}
                    isAuthenticated={this.props.isAuthenticated}
                  />
                  <PrivateRoute
                    exact
                    path="/events/new"
                    component={NewEvent}
                    isAuthenticated={this.props.isAuthenticated}
                  />
                  <PrivateRoute 
                    path="/events/edit/:id" 
                    component={EventEdit} 
                    isAuthenticated={this.props.isAuthenticated}
                  />
                  <Route path="/events/:id" component={EventDetail} />
                </Switch>
              </MainContent>
              <Footer />
            </React.Fragment>
          </ThemeProvider>
        </JssProvider>
      </Router>
    );
  }
}

export default App;
