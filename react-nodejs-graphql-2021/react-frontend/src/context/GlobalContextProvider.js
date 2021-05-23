import React, { createContext, useReducer } from "react";

import combinedReducers from "../reducers/index";

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combinedReducers[0],
    combinedReducers[1]
  );
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
