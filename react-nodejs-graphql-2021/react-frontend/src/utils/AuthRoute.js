import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider";

const AuthRoute = ({ component: Component, ...rest }) => {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  const { userState } = state;
  const { userData } = userState;

  return (
    <Route
      {...rest}
      render={(props) =>
        Object.keys(userData).length > 0 ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
