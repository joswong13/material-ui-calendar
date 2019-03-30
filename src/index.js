import React, { Component } from "react";
import { Paper, Button, Typography, IconButton } from "@material-ui/core";
import dateFns from "date-fns";
import ChevronLeftRounded from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import DisplayMonthlyCalendar from "./DisplayMonthlyCalendar";
import DisplayDailyCalendar from "./DisplayDailyCalendar";
import DailyYearlyCalendar from "./DisplayYearlyCalendar";

//Material theme
import { MuiThemeProvider } from "@material-ui/core";
import { darkTheme, lightTheme } from "./muitheme";

export default class Calendar extends Component {
  state = {
    selectedDate: new Date(),
    selectedMonth: new Date(),
    mode: 0,
    showFunctionalHeader: true,
    selectStartandEnd: false,
    selected1: null,
    selected2: null
  };

  /***************************************************************************************
   * Functional Header functions
   ***************************************************************************************/

  /**
   * If mode header is set to true, this header will be present.
   */
  renderFunctionalHeader = () => {
    return (
      <Paper
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          minHeight: "5%"
        }}
      >
        <Button
          variant={this.state.selectStartandEnd ? "contained" : "text"}
          onClick={this.selectStartandEnd}
        >
          Select Start and End Date
        </Button>
        <Button>Temporary Button</Button>
      </Paper>
    );
  };

  selectStartandEnd = () => {
    this.setState({ selectStartandEnd: !this.state.selectStartandEnd });
  };

  /***************************************************************************************
   * Calender Header functions
   ***************************************************************************************/

  /**
   * Depending on the mode, the calendar header will render different text.
   */
  renderHeader = () => {
    const dateYearFormat = "YYYY";
    const dateMonthFormat = "MMMM YYYY";
    let header;
    if (this.state.mode === 0) {
      header = (
        <Typography variant="h5" inline={true}>
          {dateFns.format(this.state.selectedDate, dateMonthFormat)}
        </Typography>
      );
    } else if (this.state.mode === 1) {
      header = (
        <Typography variant="h5" inline={true}>
          {dateFns.format(this.state.selectedDate, dateYearFormat)}
        </Typography>
      );
    } else {
      const pastFiveYears = dateFns.addYears(this.state.selectedDate, -9);
      const nextFiveYears = dateFns.addYears(this.state.selectedDate, 2);
      header = (
        <Typography variant="h5" inline={true}>
          {dateFns.format(pastFiveYears, dateYearFormat)} -
          {dateFns.format(nextFiveYears, dateYearFormat)}
        </Typography>
      );
    }

    return (
      <Paper
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          minHeight: "5%"
        }}
      >
        <IconButton onClick={() => this.onChevronClick(true)}>
          <ChevronLeftRounded />
        </IconButton>
        <Button onClick={this.modeChange}>{header}</Button>
        <IconButton onClick={() => this.onChevronClick(false)}>
          <ChevronRightRounded />
        </IconButton>
      </Paper>
    );
  };

  /*
   * Clicking on the header will change the mode between days, months and years.
   */
  modeChange = () => {
    if (this.state.mode === 0) {
      this.setState({ mode: 1 });
    } else if (this.state.mode === 1) {
      this.setState({ mode: 2, selectedDate: new Date() });
    } else {
      this.setState({ mode: 0, selectedDate: new Date() });
    }
  };

  /*
   * Clicking on the chevron buttons next to the calendar will add or subtract months/year/decades.
   */
  onChevronClick = direction => {
    if (direction) {
      if (this.state.mode === 0) {
        this.setState({
          selectedDate: dateFns.addMonths(this.state.selectedDate, -1)
        });
      } else if (this.state.mode === 1) {
        this.setState({
          selectedDate: dateFns.addYears(this.state.selectedDate, -1)
        });
      } else {
        this.setState({
          selectedDate: dateFns.addYears(this.state.selectedDate, -9)
        });
      }
    } else {
      if (this.state.mode === 0) {
        this.setState({
          selectedDate: dateFns.addMonths(this.state.selectedDate, 1)
        });
      } else if (this.state.mode === 1) {
        this.setState({
          selectedDate: dateFns.addYears(this.state.selectedDate, 1)
        });
      } else {
        this.setState({
          selectedDate: dateFns.addYears(this.state.selectedDate, 9)
        });
      }
    }
  };

  /***************************************************************************************
   * Calendar functions
   ***************************************************************************************/

  /**
   * Clicking on a date in mode 0 (Day calendar mode)
   */
  onDateClick = day => {
    this.setState({
      selectedDate: day
    });

    //This is for returning date when publishing
    if (this.props.date) {
      this.props.date(day);
    }
  };

  /**
   * Clicking on a month in mode 1 will set the month and return back to the day calendar.(Monthly calendar mode)
   */
  onSetMonth = value => {
    var result = dateFns.setMonth(this.state.selectedDate, value);
    this.setState({ selectedDate: result, mode: 0 });
  };

  /**
   * Clicking on a year in mode 2 will set the year and return back to monthly calendar. (Yearly calendar mode)
   */
  onYearClick = value => {
    this.setState({
      mode: 1,
      selectedDate: dateFns.setYear(this.state.selectedDate, value)
    });
  };

  /***************************************************************************************
   * Renders the entire body of the calendar
   ***************************************************************************************/

  modeSelector = () => {
    let textColor;
    if (this.props.light) {
      textColor = { color: "rgba(0,0,0,1)" };
    } else {
      textColor = { color: "rgba(256,256,256,1)" };
    }
    let body;
    if (this.state.mode === 0) {
      body = (
        <DisplayDailyCalendar
          selectedDate={this.state.selectedDate}
          onDateClick={this.onDateClick}
          header={this.props.modeHeader}
          light={textColor}
        />
      );
    } else if (this.state.mode === 1) {
      body = (
        <DisplayMonthlyCalendar
          onSetMonth={this.onSetMonth}
          header={this.props.modeHeader}
          light={textColor}
        />
      );
    } else {
      body = (
        <DailyYearlyCalendar
          year={this.state.selectedDate}
          onSetYear={this.onYearClick}
          header={this.props.modeHeader}
          light={textColor}
        />
      );
    }

    return (
      <div style={{ height: "100%" }}>
        {/* {this.props.modeHeader ? this.renderFunctionalHeader() : <div />} */}
        {this.renderHeader()}
        {body}
      </div>
    );
  };

  /**
   * Main render method
   */
  render() {
    return (
      <MuiThemeProvider theme={this.props.light ? lightTheme : darkTheme}>
        <Paper style={this.props.generalStyle}>{this.modeSelector()}</Paper>
      </MuiThemeProvider>
    );
  }
}
