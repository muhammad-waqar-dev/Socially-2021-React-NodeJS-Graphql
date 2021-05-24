import { Route, BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import GlobalContextProvider from "./context/GlobalContextProvider";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <Route exact path="/post/:postId" component={SinglePost} />
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
