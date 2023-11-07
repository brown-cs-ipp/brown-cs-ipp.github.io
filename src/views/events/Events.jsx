import React, { useState, useEffect, useRef } from "react";
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
  Modal,
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
    title: "Peer Career Advising Panel",
    date: "Wednesday November 9th, 2022, 5:30pm",
    location: "Macmillan Hall 117",
    description: `We welcomed students to our CS Careers Peer Advising Panel, hosted by the Industry Partners Program. The event featured four upperclassmen speakers from diverse backgrounds, sharing insights about their journeys and experiences within the CS industry, alongside invaluable recruiting advice. Attendees had the opportunity to learn about identifying suitable internships and jobs and planning their future trajectories in the CS field. An interactive Q&A session allowed participants to address all their CS-related queries. 

We were pleased to host students across various CS experience levels. Those with even a fleeting interest in CS joined us, gleaning insights from firsthand accounts in diverse tech sectors and having their pressing questions addressed. After the event, students stayed to chat with panelists informally and ask individual questions.`,
    image: event_img,
  },
  {
    title: "Ascend Analytics Info Session",
    date: "Monday, November 14, 2022, 5:30 PM",
    location: "Metcalf Chem Auditorium",
    description: `The Ascend Analytics info session provided insights into their innovative "climate tech" services revolutionizing energy analytics and consulting in the electric grid.

Ascend Analytics offered advanced energy analytic products, serving short and long-term power supply decisions. With offices in Boulder, Colorado, Bozeman, Montana, and Oakland, California, their solutions benefited energy companies in North America and Europe.

The company emphasized accurate modeling of risk variables amidst evolving energy markets. Their single analytical platform enabled portfolio optimization. Ascend Analytics was actively hiring for various positions. 

They provided clients open access to a dedicated team of energy analysts and system experts to maximize solution value.

For more information about Ascend Analytics, visit their website or contact them directly.`,
    image: event_img,
  },
  {
    title: "Info Session with Dana from Solar Stewards",
    date: "2022",
    location: "",
    description:
      "Dana Clare Redden, Brown University alumnus, joined us at Brown University via Zoom to speak about her work at Solar Stewards and the internship opportunities available for students who have experience with CS courses and are interested in enviornmental, societal, and governance goals (ESG) with an innovative public-private-partnership for distributed generation solar development. Dana was seeking interns from multiple fields, project management, business strategy, blockchain, and students with interest in low-code platforms like Bubble.io.",
    image: event_img,
  },
  {
    title: "LinkedIn Headshot Event",
    date: "Friday, March 17th, 2022, 1:00pm EDT",
    location: "Watson Center for Information Technology (CIT), Room 101",
    description:
      "The IPP team welcomed students to drop-in and take a LinkedIn headshot in the first floor of the CIT, with over 100 student attendees taking advantage of this free opportunity. We will be running more professional headshot drop-in events soon, so be on the lookout for announcements if you missed our last one.",
    image: event_img,
  },
  {
    title: "Bloomberg Info Session",
    date: "Tuesday, September 12th, 2023, 5:30pm EDT",
    location:
      "Watson Center for Information Technology (CIT), 3rd Floor Atrium",
    description:
      "Bloomberg, one of the official Brown CS Industry Partners, joined us in person at Brown for an info-session about their hiring opportunities and job culture. This info session involved a technical interview workshop, where students learned how to ace a technical interview when applying for the role of software engineer.",
    image: event_img,
  },
  {
    title: "Industry Night – Deloitte and Jane Street",
    date: "Tuesday September 19th, 2023, 5:30pm EDT",
    location:
      "Watson Center for Information Technology (CIT), 3rd Floor Atrium",
    description: `Industry night was an engaging event that provided students with valuable insights into industry opportunities. The event featured two prominent industry partners, Deloitte and Jane Street, who shared information about the companies they represented and discussed internship and full-time job opportunities. Attendees also had the opportunity to ask questions and gain a deeper understanding of these organizations.

The event took place on the 3rd floor of the CIT, where each company delivered short pitches to the students. Afterward, the gathering moved to the 3rd floor for food and conversations, creating an excellent networking opportunity for all participants.

This event was a significant success, attracting a substantial turnout of over 400 students eager to explore career prospects and engage with industry leaders. While this event has concluded, we encourage you to stay connected with Brown Computer Science for future events and opportunities.`,
    image: event_img,
  },
  {
    title: "Climate Tech with Steven Zhang and Option Zero",
    date: "Thursday September 14th, 2023, 5:30pm EDT",
    location: "Zoom",
    description: `We welcomed Steven Zhang from ClimateTechList and Jamie and Jason Curtis from OptionZero for an info session about careers in the intersection between software and climate. 

Steven Zhang runs ClimateTechList, a job board that tracks thousands of job openings at high impact tech companies, with filterable categories to maximize your job search. With many students interested in the climate space, Steven was able to contextualize what it means to work in climate software, describing the different kinds of companies and how their technological products directly or indirectly result in climate action, providing us with a more nuanced understanding of the climate-tech space. 

Jaime and Jason Curtis are a husband and wife team that run Option Zero, a software consultancy for climate companies and initatives. They provided insightful career advice, comparing both of their career paths since graduating college, and spoke about why they moved from company to company, and then eventually started their own consultancy. They emphasized weighing the costs and benefits of working at large tech companies versus smaller startups, and seeking opportunities based on whether you are interested in gaining mentorship or ownership over your work.`,
    image: event_img,
  },
];

// Events component
export default function Events() {
  // Use useRef to create a reference to the FullCalendar component
  const calendarRef = useRef(null);

  const [openModal, setOpenModal] = useState({});

  const handleOpen = (title) => {
    setOpenModal({ ...openModal, [title]: true });
  };

  const handleClose = (title) => {
    setOpenModal({ ...openModal, [title]: false });
  };

  const [arrowOpacity, setArrowOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      const newOpacity = Math.max(1 - scrollValue / 200, 0);
      setArrowOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <BrowserView align="center">
      <ThemeProvider theme={theme}>
        <br />
        <Typography variant="h4">Upcoming IPP Events</Typography>
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
          />
        </div>
        <div
          class="bounce"
          style={{
            position: "absolute",
            bottom: "2%",
            right: "2%",
            opacity: arrowOpacity,
          }}
        >
          <ArrowDownwardIcon style={{ scale: "1.5" }} />
        </div>
        <br />
        <br />
        <Typography variant="h4" align="center">
          Past IPP Events
        </Typography>
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
                      <Typography variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <br />
                      <Typography variant="body1">Date: {item.date}</Typography>
                      <br />
                      <Typography variant="body1">
                        Location: {item.location}
                      </Typography>
                    </CardContent>
                    <Box p={2}>
                      <Button
                        variant="contained"
                        onClick={() => handleOpen(item.title)}
                      >
                        Read More
                      </Button>
                      <Modal
                        open={openModal[item.title] || false}
                        onClose={() => handleClose(item.title)}
                      >
                        <Card
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            maxWidth: "50vw",
                            maxHeight: "50vh",
                            padding: "2rem",
                            boxShadow: 24,
                            overflowY: "auto",
                          }}
                        >
                          <Typography variant="h5" component="h2">
                            {item.title}
                          </Typography>
                          <br />
                          <Typography
                            variant="body1"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {item.description}
                          </Typography>
                          <br />
                          <Box display="flex" justifyContent="flex-end">
                            <Button
                              variant="contained"
                              onClick={() => handleClose(item.title)}
                            >
                              Close
                            </Button>
                          </Box>
                        </Card>
                      </Modal>
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
