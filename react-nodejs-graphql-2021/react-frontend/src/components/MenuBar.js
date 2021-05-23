import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { pathname } from "../utils/hooks";

import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider";

import actions from "../actions";
const { LOGOUT } = actions;

const path = pathname === "/" ? "home" : pathname.substr(1);

function MenuBar() {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  const { userState } = state;
  const { userData } = userState;

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogout = (_) => {
    LOGOUT(dispatch);
  };

  const menuBar =
    userData && Object.keys(userData).length > 0 ? (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={userData?.username} active as={Link} to="/" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={handleLogout} />
        </Menu.Menu>
      </Menu>
    ) : (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    );
  return menuBar;
}
export default MenuBar;
