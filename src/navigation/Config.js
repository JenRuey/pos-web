import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Path from "./Path";

export const PrivateRoutes = ({ component: Component, ...rest }) => {
  const hasLogin = useSelector((state) => state.util.login_user !== null);
  return (
    <Route
      {...rest}
      render={(props) =>
        hasLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: Path.login,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
