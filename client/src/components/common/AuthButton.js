import React from "react";
import { Link } from "react-router-dom";

const AuthButton = ({ isAuthenticated, handleLogOut }) => {
  if (isAuthenticated) {
    return (
      <Link to="" onClick={handleLogOut}>
        Sign out
      </Link>
    );
  } else {
    return <Link to="/login">Sign in</Link>;
  }
};

export default AuthButton;
