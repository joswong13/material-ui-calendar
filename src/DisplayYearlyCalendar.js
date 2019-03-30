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

const DisplayMonthlyCalendar = props => {
  const dateYearFormat = "YYYY";
  let pastYears = dateFns.addYears(props.year, -9);
  let futureYears = dateFns.addYears(props.year, 2);
  let yearStart = parseInt(dateFns.format(pastYears, dateYearFormat));
  let yearEnd = parseInt(dateFns.format(futureYears, dateYearFormat));
  let rowsOfYears = [];
  let rows = [];
  let rowCounter = 0;

  let currentYear = yearStart;
  //onClick={() => props.onSetMonth(monthID)}
  while (currentYear < yearEnd + 1) {
    for (let i = 0; i < 3; i++) {
      let cloneCurrentYear = currentYear;
      rowsOfYears.push(
        <TableCell key={currentYear}>
          <CardActionArea
            style={{ height: "100%" }}
            onClick={() => props.onSetYear(cloneCurrentYear)}
          >
            <Card style={{ backgroundColor: "rgba(0,0,0,0)", height: "100%" }}>
              <CardContent>
                <Typography
                  align="center"
                  style={{ color: "rgba(256,256,256,1)" }}
                >
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
    <Table style={props.header ? { height: "85%" } : { height: "90%" }}>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

export default DisplayMonthlyCalendar;
