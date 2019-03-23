import React, { Component } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import AppText from "components/common/AppText";
import AppButton from "components/common/AppButton";
import FullWidthContainer from "components/common/FullWidthContainer";

const LoginMain = FullWidthContainer.withComponent("main").extend`
  position: relative;
  display: flex;
  height: 100%;
`;

const LoginForm = styled.form`
  position: relative;
  z-index: 1;
  margin: auto;
`;

const LoginLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
`;

const LabelText = AppText.extend`
  display: block;
  margin-bottom: 0.4rem;
  color: #404937;
`;

const LoginTextInput = AppText.withComponent("input").extend`
  width: 18rem;
  height: 2rem;
  padding: 0.5rem;
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

const LoginButton = AppButton.withComponent("input").extend`
  display: block;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
`;

const GreenCircle = Circle.extend`
  top: -9vw;
  left: -12vw;
  width: 25vw;
  max-width: 16rem;
  height: 25vw;
  max-height: 16rem;
  background: #bfd8a6;
`;

const YellowCircle = Circle.extend`
  top: -12vw;
  right: 6vw;
  width: 30vw;
  max-width: 16rem;
  height: 30vw;
  max-height: 16rem;
  background: #fadc84;
`;

const BlueCircle = Circle.extend`
  bottom: -10vw;
  left: 6vw;
  width: 25vw;
  max-width: 14rem;
  height: 25vw;
  max-height: 14rem;
  background: #88cfc9;
`;

const FleshCircle = Circle.extend`
  bottom: -12vw;
  right: -5vw;
  width: 35vw;
  max-width: 20rem;
  height: 35vw;
  max-height: 20rem;
  background: #ffe5cb;
`;

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
        <LoginMain>
          <LoginForm
            onSubmit={event =>
              this.props.handleLogIn(
                event,
                this.state.email,
                this.state.password
              )
            }
          >
            <LoginLabel>
              <LabelText>Email address:</LabelText>
              <LoginTextInput
                type="email"
                onChange={event => handleInputChange("email", event)}
              />
            </LoginLabel>
            <LoginLabel style={{ marginBottom: "2rem" }}>
              <LabelText>Password:</LabelText>
              <LoginTextInput
                type="password"
                onChange={event => handleInputChange("password", event)}
              />
            </LoginLabel>
            {/* <label><input type="checkbox" /> Keep me logged in</label> */}
            {/* <a href="#">Forgot password?</a> */}
            <LoginButton type="submit" value="Sign in" />
          </LoginForm>
          <GreenCircle />
          <YellowCircle />
          <BlueCircle />
          <FleshCircle />
        </LoginMain>
      );
    } else {
      return (
        <Redirect
          to={
            (props.location.state && props.location.state.referrer) ||
            "/dashboard"
          }
        />
      );
    }
  }
}

export default Login;
