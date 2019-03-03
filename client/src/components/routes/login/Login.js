import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange = (input, event) => {
    this.setState({
      [input]: event.target.value
    });
  };

  render() {
    const handleInputChange = this.handleInputChange;
    const props = this.props;

    if (!props.isAuthenticated) {
      return (
        <main>
          <form
            onSubmit={event =>
              this.props.handleLogIn(
                event,
                this.state.email,
                this.state.password
              )
            }
          >
            <label>
              Email address:
              <input
                type="email"
                onChange={event => handleInputChange("email", event)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                onChange={event => handleInputChange("password", event)}
              />
            </label>
            {/* <label><input type="checkbox" /> Keep me logged in</label> */}
            {/* <a href="#">Forgot password?</a> */}
            <input type="submit" />
          </form>
        </main>
      );
    } else {
      return (
        <Redirect
          to={(props.location.state && props.location.state.referrer) || "/"}
        />
      );
    }
  }
}

export default Login;
