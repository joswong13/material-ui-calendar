import React, { useState } from "react";
import { Paper, Button, Typography, IconButton } from "@material-ui/core";
import { format, addYears, setMonth, setYear, addMonths } from "date-fns";
import ChevronLeftRounded from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import DisplayMonthlyCalendar from "./DisplayMonthlyCalendar";
import DisplayDailyCalendar from "./DisplayDailyCalendar";
import DailyYearlyCalendar from "./DisplayYearlyCalendar";

//Material theme
import { MuiThemeProvider } from "@material-ui/core";
import { darkTheme, lightTheme } from "./muitheme";

const Calendar = props => {
  // state = {
  //   selectedDate: new Date(),
  //   selectedMonth: new Date(),
  //   mode: 0,
  //   showFunctionalHeader: true,
  //   selectStartandEnd: false,
  //   selected1: null,
  //   selected2: null,
  //   functionalMode: false
  // };
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [mode, setMode] = useState(0)
  const [showFunctionalHeader, setShowFunctionalHeader] = useState(true)
  const [selectStartandEnd, setSelectStartandEnd] = useState(false)
  const [selected1, setSelected1] = useState(null)
  const [selected2, setSelected2] = useState(null)
  const [functionalMode, setFunctionalMode] = useState(false)
  /***************************************************************************************
   * Calender Header functions
   ***************************************************************************************/

  /**
   * Depending on the mode, the calendar header will render different text.
   */
  renderHeader = () => {
    const dateYearFormat = "yyyy";
    const dateMonthFormat = "MMMM yyyy";
    let header;
    if (mode === 0) {
      header = (
        <Typography variant="h5" inline={true}>
          {format(selectedDate, dateMonthFormat)}
        </Typography>
      );
    } else if (mode === 1) {
      header = (
        <Typography variant="h5" inline={true}>
          {format(selectedDate, dateYearFormat)}
        </Typography>
      );
    } else {
      const pastFiveYears = addYears(selectedDate, -9);
      const nextFiveYears = addYears(selectedDate, 2);
      header = (
        <Typography variant="h5" inline={true}>
          {format(pastFiveYears, dateYearFormat)} -{" "}
          {format(nextFiveYears, dateYearFormat)}
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
        <IconButton onClick={() => onChevronClick(true)}>
          <ChevronLeftRounded />
        </IconButton>
        <Button onClick={modeChange}>{header}</Button>
        <IconButton onClick={() => onChevronClick(false)}>
          <ChevronRightRounded />
        </IconButton>
      </Paper>
    );
  };

  /**
   * Render the header but without mode change.
   */
  renderYearHeader = () => {
    const dateYearFormat = "yyyy";
    let header;

    const pastFiveYears = addYears(selectedDate, -9);
    const nextFiveYears = addYears(selectedDate, 2);
    header = (
      <Typography variant="h5" inline={true}>
        {format(pastFiveYears, dateYearFormat)} -{" "}
        {format(nextFiveYears, dateYearFormat)}
      </Typography>
    );

    return (
      <Paper
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          minHeight: "5%"
        }}
      >
        <IconButton onClick={() => yearChevronClick(true)}>
          <ChevronLeftRounded />
        </IconButton>
        {header}
        <IconButton onClick={() => yearChevronClick(false)}>
          <ChevronRightRounded />
        </IconButton>
      </Paper>
    );
  };

  /*
   * Clicking on the header will change the mode between days, months and years.
   */
  const modeChange = () => {
    if (mode === 0) {
      setMode(1);
    } else if (mode === 1) {
      setMode(2)
      setSelectedDate(new Date());
    } else {
      setMode(0)
      setSelectedDate(new Date());    
    }
  };

  /*
   * Clicking on the chevron buttons next to the calendar will add or subtract months/year/decades.
   */
  const onChevronClick = direction => {
    if (direction) {
      if (mode === 0) {
        setSelectedDate( addMonths(selectedDate, -1))
      } else if (mode === 1) {
        setSelectedDate( addYears(selectedDate, -1))
      } else {
        setSelectedDate( addYears(selectedDate, -9))
      }
    } else {
      if (mode === 0) {
        setSelectedDate( addMonths(selectedDate, 1))
      } else if (mode === 1) {
        setSelectedDate( addYears(selectedDate, 1))
      } else {
        setSelectedDate( addYears(selectedDate, 9))
      }
    }
  };

  /*
   * Clicking on the chevron buttons next to the calendar will add or subtract months/year/decades.
   */
  const yearChevronClick = direction => {
    if (direction) {
      setSelectedDate(addYears(selectedDate, -9));
    } else {
      setSelectedDate(addYears(selectedDate, 9));
    }
  };

  /***************************************************************************************
   * Calendar functions (on click)
   ***************************************************************************************/

  /**
   * Clicking on a date in mode 0 (Day calendar mode)
   */
   const onDateClick = day => {
    setSelectedDate(day);
  //This is for returning date when publishing
  if (
    props.selection !== undefined &&
    props.mode !== "month" &&
    props.mode !== "year"
  ) {
    props.selection(day);
  }
};

  /**
   * Clicking on a month in mode 1 will set the month and return back to the day calendar.(Monthly calendar mode)
   * If explicitly set to month mode, it will only return the month value.
   * Else it will change back to mode 0.
   */
   const onSetMonth = value => {
    if (props.selection !== undefined && props.mode === "month") {
      props.selection(value);
    } else {
      var result = setMonth(selectedDate, value);
      setSelectedDate(result)
      setMode(0);
    }
  };

  /**
   * Clicking on a year in mode 2 will set the year and return back to monthly calendar. (Yearly calendar mode)
   * If explicitly set to year mode, it will only return the year value.
   * Else it will change back to mode 1.
   */
   const onYearClick = value => {
    if (props.selection !== undefined && props.mode === "year") {
      props.selection(value);
    } else {
        setMode(1)
        setSelectedDate(setYear(selectedDate, value));
    }
  };

  /***************************************************************************************
   * Renders the entire body of the calendar
   * Alternate between day, month and year.
   ***************************************************************************************/

  /**
   * Renders the regular calendar that can switch between day, month and year view.
   */
   const defaultDaySelector = () => {
    let textColor;
    if (props.light) {
      textColor = { color: "rgba(0,0,0,1)" };
    } else {
      textColor = { color: "rgba(256,256,256,1)" };
    }
    let body;
    if (mode === 0) {
      body = (
        <DisplayDailyCalendar
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          light={textColor}
        />
      );
    } else if (mode === 1) {
      body = (
        <DisplayMonthlyCalendar
          onSetMonth={onSetMonth}
          light={textColor}
        />
      );
    } else {
      body = (
        <DailyYearlyCalendar
          year={selectedDate}
          onSetYear={onYearClick}
          light={textColor}
        />
      );
    }

    return (
      <div style={{ height: "100%" }}>
        {renderHeader()}
        {body}
      </div>
    );
  };

  /**
   * Only render the month calendar and does not switch modes.
   */
 const  monthSelector = () => {
    let textColor;
    if (props.light) {
      textColor = { color: "rgba(0,0,0,1)" };
    } else {
      textColor = { color: "rgba(256,256,256,1)" };
    }
    return (
      <DisplayMonthlyCalendar onSetMonth={onSetMonth} light={textColor} />
    );
  };

  /**
   * Only render the year calendar and does not switch modes.
   */
   const yearSelector = () => {
    let textColor;
    if (props.light) {
      textColor = { color: "rgba(0,0,0,1)" };
    } else {
      textColor = { color: "rgba(256,256,256,1)" };
    }
    return (
      <div style={{ height: "100%" }}>
        {renderYearHeader()}
        <DailyYearlyCalendar
          year={selectedDate}
          onSetYear={onYearClick}
          light={textColor}
        />
      </div>
    );
  };
  //year={selectedDate}
  /**
   * Depending on the props given, renders the different modes.
   */
   const  modeSelector = () => {
    if (props.mode === "year") {
      return yearSelector();
    } else if (props.mode === "month") {
      return monthSelector();
    } else {
      return defaultDaySelector();
    }
  };
  /**
   * Main render method
   */

    return (
      <MuiThemeProvider theme={props.light ? lightTheme : darkTheme}>
        <Paper style={props.generalStyle}>{modeSelector()}</Paper>
      </MuiThemeProvider>
    );
}
export default Calendar;