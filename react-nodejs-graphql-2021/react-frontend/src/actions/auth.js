export const USERLOGINDATA = "USERLOGINDATA";
export const USERLOGOUTDATA = "USERLOGOUTDATA";

export const LOGIN = (dispatch, requestbody) => {
  localStorage.setItem("jwtToken", requestbody.token);
  dispatch({
    type: USERLOGINDATA,
    userData: requestbody,
  });
};

export const LOGOUT = (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch({
    type: USERLOGOUTDATA,
  });
};
