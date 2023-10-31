import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./Events.css";
import event_img from "./event.jpg";

// Create a custom theme for MUI components
const theme = createTheme({
  typography: {
    fontFamily: "franklin-gothic-atf",
    fontWeight: 200,
  },
  palette: {
    primary: {
      main: "#193AA5",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

const pastEvents = [
  {
    title: "Event 1",
    date: "Jan 1, 2021",
    description: "Description 1",
    image: event_img,
  },
  {
    title: "Event 2",
    date: "Jan 2, 2021",
    description: "Description 2",
    image: event_img,
  },
  {
    title: "Event 3",
    date: "Jan 3, 2021",
    description: "Description 3",
    image: event_img,
  },
  {
    title: "Event 4",
    date: "Jan 4, 2021",
    description: "Description 4",
    image: event_img,
  },
];

// Events component
export default function Events() {
  // Use useRef to create a reference to the FullCalendar component
  const calendarRef = useRef(null);

  // Function to handle event click in the calendar
  // function handleEventClick(event) {
  //   console.log("Event clicked: ", event);
  // }

  return (
    <BrowserView align="center">
      <ThemeProvider theme={theme}>
        <br />
        <Typography variant="h4">IPP Events Calendar</Typography>
        <br />
        <div style={{ width: "90%" }}>
          {/* Configure FullCalendar component */}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
            googleCalendarApiKey="AIzaSyCjUHYGVSyML1lCpnIeNDribmgF5RD4LA0"
            events={{
              googleCalendarId:
                "c_fd7cdd4a776df9bc604b0cb9971348a49bd1a40ff03543ba97718a16a81a4c86@group.calendar.google.com",
              color: "#193AA5",
              textColor: "#fff",
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height="80vh"
            // eventClick={handleEventClick}
          />
        </div>
        <br />
        <div
          class="bounce"
          style={{ width: "100%" }}
        >
          <ArrowDownwardIcon />
        </div>
        <br />
        <Typography variant="h4" align="center">Past Events</Typography>
        <div style={{ width: "80%", margin: "auto" }}>
          <Box m={4}>
            <Grid container spacing={4} alignItems="stretch">
              {pastEvents.map((item) => (
                <Grid item xs={4} key={item.title}>
                  <Card
                    align="left"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200vh"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent style={{ flexGrow: 1 }}>
                      <Typography variant="h5">{item.title}</Typography>
                      <Typography>{item.description}</Typography>
                    </CardContent>
                    <Box p={2}>
                      <Button
                        variant="contained"
                        target="_blank"
                        href={item.link}
                      >
                        Read More
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
        <br />
      </ThemeProvider>
    </BrowserView>
  );
}

// {/* <iframe
//   title="My Google Calendar"
//   src="https://calendar.google.com/calendar/embed?src=c_fd7cdd4a776df9bc604b0cb9971348a49bd1a40ff03543ba97718a16a81a4c86%40group.calendar.google.com&ctz=America%2FNew_York"
//   style={{
//     border: "none",
//     width: isBrowser ? "800px" : "90vw",
//     height: isBrowser ? "600px" : "80vh",
//   }}
//   frameborder="0"
//   scrolling={isBrowser ? "no" : "yes"}
// />; */}
