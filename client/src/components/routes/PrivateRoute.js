import { Route } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { referrer: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
