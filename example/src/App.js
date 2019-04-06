import React, { Component } from "react";

import Calendar from "react-material-ui-calendar";

export default class App extends Component {
  callBackFunction = value => {
    console.log("The selection is  -> ", value);
  };
  render() {
    return (
      <Calendar
        generalStyle={{
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: "rgba(0,0,0,1)",
          height: "100%",
          overflow: "auto"
        }}
        selection={this.callBackFunction}
        mode="month"
      />
    );
  }
}
