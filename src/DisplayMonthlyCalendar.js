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

const DisplayMonthlyCalendar = props => {
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
            <Card style={{ backgroundColor: "rgba(0,0,0,0)", height: "100%" }}>
              <CardContent>
                <Typography
                  align="center"
                  style={{ color: "rgba(256,256,256,1)" }}
                >
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
    <Table style={props.header ? { height: "85%" } : { height: "90%" }}>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};

export default DisplayMonthlyCalendar;
