import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Card,
  CardActionArea,
  CardContent
} from "@material-ui/core";
import dateFns from "date-fns";

const DisplayDailyCalendar = props => {
  const today = new Date();
  const { selectedDate } = props;
  const monthStart = dateFns.startOfMonth(selectedDate);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const weekdays = [
    { id: 0, day: "Sun" },
    { id: 1, day: "Mon" },
    { id: 2, day: "Tue" },
    { id: 3, day: "Wed" },
    { id: 4, day: "Thu" },
    { id: 5, day: "Fri" },
    { id: 6, day: "Sat" }
  ];

  const eachWeek = [];
  let daysOfWeek = [];

  let day = startDate;
  let end = endDate;
  let formattedDate;
  const dateFormat = "D";

  let weekNumber = 1;
  while (day <= end) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;
      daysOfWeek.push(
        <TableCell key={formattedDate}>
          <CardActionArea
            onClick={() => props.onDateClick(dateFns.parse(cloneDay))}
            style={{ height: "100%" }}
          >
            <Card
              style={
                dateFns.isSameDay(day, today)
                  ? {
                      backgroundColor: "rgba(0,255,255,0.5)",
                      height: "100%"
                    }
                  : {
                      backgroundColor: "rgba(0,0,0,0)",
                      height: "100%"
                    }
              }
            >
              <CardContent>
                <Typography
                  align="center"
                  style={
                    dateFns.isSameMonth(day, monthStart)
                      ? {
                          color: "rgba(256,256,256,1)"
                        }
                      : {
                          color: "rgba(128,128,128,1)"
                        }
                  }
                >
                  {formattedDate}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </TableCell>
      );

      day = dateFns.addDays(day, 1);
    }

    eachWeek.push(<TableRow key={weekNumber}>{daysOfWeek}</TableRow>);
    daysOfWeek = [];
    weekNumber += 1;
  }
  return (
    <Table style={props.header ? { height: "85%" } : { height: "90%" }}>
      <TableHead>
        <TableRow>
          {weekdays.map(day => (
            <TableCell key={day.id}>
              <Typography align="center">{day.day}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{eachWeek}</TableBody>
    </Table>
  );
};

export default DisplayDailyCalendar;
