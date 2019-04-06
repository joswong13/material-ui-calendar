import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import dateFns from "date-fns";

const DisplayYearlyCalendar = props => {
  let today = new Date();
  const currentYearDateFNS = dateFns.getYear(today);
  const dateYearFormat = "YYYY";
  let pastYears = dateFns.addYears(props.year, -9);
  let futureYears = dateFns.addYears(props.year, 2);
  let yearStart = parseInt(dateFns.format(pastYears, dateYearFormat));
  let yearEnd = parseInt(dateFns.format(futureYears, dateYearFormat));
  let rowsOfYears = [];
  let rows = [];
  let rowCounter = 0;

  /**
   * If the month being displayed is the same as current month, highlight it with a gray box.
   */
  const ifSameCurrentYearCard = currentYearCounter => {
    if (currentYearDateFNS === currentYearCounter) {
      return { backgroundColor: "rgba(128,128,128,0.5)", height: "100%" };
    } else {
      return { backgroundColor: "rgba(0,0,0,0)", height: "100%" };
    }
  };

  let currentYear = yearStart;
  while (currentYear < yearEnd + 1) {
    for (let i = 0; i < 3; i++) {
      let cloneCurrentYear = currentYear;
      rowsOfYears.push(
        <TableCell key={currentYear}>
          <CardActionArea
            style={{ height: "100%" }}
            onClick={() => props.onSetYear(cloneCurrentYear)}
          >
            <Card style={ifSameCurrentYearCard(cloneCurrentYear)}>
              <CardContent>
                <Typography align="center" style={props.textColor}>
                  {currentYear}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </TableCell>
      );
      currentYear += 1;
    }
    rows.push(
      <TableRow key={rowCounter} style={{ height: "25%" }}>
        {rowsOfYears}
      </TableRow>
    );
    rowsOfYears = [];
    rowCounter += 1;
  }

  return (
    <Table style={{ height: "90%" }}>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

export default DisplayYearlyCalendar;
