import combineReducers from "react-combine-reducers";

import { authReducer, authInitialState } from "./authReducer";

export default combineReducers({
  userState: [authReducer, authInitialState],
});
