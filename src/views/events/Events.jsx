import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import "./Events.css";

// Create a custom theme for MUI components
const theme = createTheme({
  typography: {
    fontFamily: "franklin-gothic-atf",
    fontWeight: 200,
  },
  palette: {
    primary: {
      main: '#193AA5',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

// Events component
export default function Events() {

  // Use useRef to create a reference to the FullCalendar component
  const calendarRef = useRef(null);

  // Function to handle event click in the calendar
  function handleEventClick(event) {
    console.log('Event clicked: ', event);
  }

  return (
    <div id="gcal" align="center">
      <br />
      {/* Use the custom theme for Typography component */}

      <BrowserView> 
        <ThemeProvider theme={theme}>
          <Typography variant="h4">IPP Calendar</Typography>
        </ThemeProvider>
        <br />

        <div style={{ width: '1000px', height: '600px' }}>
        {/* Configure FullCalendar component */}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
            googleCalendarApiKey="AIzaSyCjUHYGVSyML1lCpnIeNDribmgF5RD4LA0"
            events={{
              googleCalendarId: 'c_fd7cdd4a776df9bc604b0cb9971348a49bd1a40ff03543ba97718a16a81a4c86@group.calendar.google.com',
              color: '#193AA5',
              textColor: '#fff',
            }}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            eventClick={handleEventClick}
          />
        </div>
      </BrowserView>
      
      {/* Default Gcal Embed */}

      {/* <iframe
        title="My Google Calendar"
        src="https://calendar.google.com/calendar/embed?src=c_fd7cdd4a776df9bc604b0cb9971348a49bd1a40ff03543ba97718a16a81a4c86%40group.calendar.google.com&ctz=America%2FNew_York"
        style={{
          border: 'none',
          width: isBrowser ? '800px' : '90vw',
          height: isBrowser ? '600px' : '80vh'}}
        frameborder="0"
        scrolling={isBrowser ? "no" : "yes"} /> */}

    </div>
  );
}

