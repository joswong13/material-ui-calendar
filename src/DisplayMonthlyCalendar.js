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
  let today = new Date();
  const currentMonth = dateFns.getMonth(today);

  /**
   * If the month being displayed is the same as current month, highlight it with a gray box.
   * @param {*} currentMonthCounter
   */
  const ifSameMonthCard = currentMonthCounter => {
    if (currentMonth === currentMonthCounter) {
      return { backgroundColor: "rgba(128,128,128,0.5)", height: "100%" };
    } else {
      return { backgroundColor: "rgba(0,0,0,0)", height: "100%" };
    }
  };

  const months = [
    { id: 0, name: "Jan" },
    { id: 1, name: "Feb" },
    { id: 2, name: "Mar" },
    { id: 3, name: "Apr" },
    { id: 4, name: "May" },
    { id: 5, name: "Jun" },
    { id: 6, name: "Jul" },
    { id: 7, name: "Aug" },
    { id: 8, name: "Sep" },
    { id: 9, name: "Oct" },
    { id: 10, name: "Nov" },
    { id: 11, name: "Dec" }
  ];
  let rowsOfMonths = [];
  let rows = [];
  let monthCounter = 0;
  let rowCounter = 0;
  while (monthCounter < 12) {
    for (let i = 0; i < 3; i++) {
      const monthID = months[monthCounter].id;
      rowsOfMonths.push(
        <TableCell key={monthID}>
          <CardActionArea
            onClick={() => props.onSetMonth(monthID)}
            style={{ height: "100%" }}
          >
            <Card style={ifSameMonthCard(monthCounter)}>
              <CardContent>
                <Typography align="center" style={props.textColor}>
                  {months[monthCounter].name}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </TableCell>
      );
      monthCounter += 1;
    }
    rows.push(
      <TableRow key={rowCounter} style={{ height: "25%" }}>
        {rowsOfMonths}
      </TableRow>
    );
    rowsOfMonths = [];
    rowCounter += 1;
  }

  return (
    <Table style={{ height: "90%" }}>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

export default DisplayMonthlyCalendar;
