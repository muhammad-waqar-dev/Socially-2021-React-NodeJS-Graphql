//import axios from "axios";
import * as authActions from "./Auth";

// export const VERIFIED_TOKEN = axios.interceptors.request.use(
//   (config) => {
//     let token = "";
//     let project_id = "";
//     let user_id = "";
//     let access_token = "";
//     let unScopedToken = "";
//     if (isBrowser) {
//       const user = JSON.parse(window.localStorage.getItem("user"));
//       const keycloak = JSON.parse(window.localStorage.getItem("keycloak"));
//       token = user?.token;
//       project_id = user?.project_id;
//       user_id = user?.user_id;
//       access_token = keycloak?.access_token;
//       unScopedToken = user?.unScopedToken;
//       config.headers["user-id"] = user_id;
//       config.headers["project-id"] = project_id;
//       config.headers["x-auth-token"] = token;
//       config.headers["access-token"] = access_token;
//       config.headers["x-auth-unScope-token"] = unScopedToken;
//       config.headers["clientId"] = "marketplace";
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default {
  ...authActions,
};
