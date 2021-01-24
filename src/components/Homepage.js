import React from "react";

import Footer from "./footer";

const styles = {
  welcome: {
    position: "absolute",
    inset: 0,
    top: "50%",
    textAlign: "center",
    fontSize: 40,
  },
};

export default function Homepage() {
  return (
    <>
      <div style={styles.welcome}>Welcome!</div>
      <Footer />
    </>
  );
}
