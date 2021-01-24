import React from "react";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { ShoppingCart, Store } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const styles = {
  bot_nav: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    margin: "auto",
    border: "1px solid black",
  },
};

export default function Footer() {
  return (
    <BottomNavigation showLabels style={styles.bot_nav}>
      <BottomNavigationAction
        component={NavLink}
        activeStyle={{ color: "#1976D2" }}
        to="/List"
        label="Shopping List"
        icon={<ShoppingCart />}
      />

      <BottomNavigationAction
        component={NavLink}
        activeStyle={{ color: "#1976D2" }}
        to="/Inventory"
        label="Home Inventory"
        icon={<Store />}
      />
    </BottomNavigation>
  );
}
