import React, { Component } from "react";

import Calendar from "react-material-ui-calendar";

export default class App extends Component {
  render() {
    return (
      <Calendar
        modeHeader={true}
        generalStyle={{
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: "rgba(0,0,0,0.8)",
          height: "100%",
          overflow: "auto"
        }}
        dark={true}
      />
    );
  }
}
