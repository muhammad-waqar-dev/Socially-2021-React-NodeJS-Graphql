import jwtDecode from "jwt-decode";
import actions from "../actions";
const { USERLOGINDATA, USERLOGOUTDATA } = actions;

export const authInitialState = {
  userData: {},
};

if (localStorage.getItem("jwtToken")) {
  const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    authInitialState.userData = decodeToken;
  }
}

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case USERLOGINDATA: {
      const { userData } = action;
      // console.log("user data -----------", userData);
      return { ...state, userData };
    }
    case USERLOGOUTDATA: {
      // const { userData } = action;
      return { ...state, userData: {} };
    }
    default:
      return state;
  }
};
