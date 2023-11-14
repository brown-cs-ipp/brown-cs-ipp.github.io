import React, { useState } from "react";
import {
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { createTheme, ThemeProvider } from "@mui/material";
import "./Blog.css";
import GridCards from "../../components/grid-cards/GridCards";

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

const blogData = [
  {
    title: "Introducing IPP! Meet our new website.",
    date: "November 8th, 2023",
    content: `Welcome: What is IPP?

The Industry Partners Program is a Brown organization under the Computer Science Department that connects the Brown CS community with industry opportunities. Primarily, we help undergraduate students find fulfilling jobs and internships by networking with companies, co-hosting recruitment / career education events, and sharing helpful resources to democratize access to information. We are committed to helping students explore a diverse range of opportunities to find what best suits their needs, including applications of technology for social good. 

Our highly collaborative team consists of undergraduate student ambassadors and CS department staff work together to coordinate events and initiatives. Student ambassador roles are paid, and we are a growing team. If you are interested in joining, be sure to keep an eye out for announcements about applications. 

CS-specific career resources 

Searching for career opportunities is an unpredictable process that can be exciting but challenging. We work to make this website a centralized source of reliable information that can guide you throughout the process. We host live events (in-person and remote accessible), which many students attend to learn more about job-searching. Feel free to take a look at our past events to get an idea of what we’ve done before. Whether or not you are a CS concentrator, subscribe to the IPP mailing list to be notified directly about events. 

Coming up: 

On November 14, we will be hosting College-to-Climate for an in-person, interactive information session. Be sure to subscribe to our mailing list to receive more details and registration information for the event!`,
  },
];

export default function Blog() {
  return (
    <div>
      <BrowserView>
        <ThemeProvider theme={theme}>
          <br />
          <Typography variant="h4" align="center">
            Blog
          </Typography>
          <br />
          <GridCards data={blogData} isMobile={true} />
          <br />
        </ThemeProvider>
      </BrowserView>

      <MobileView>
        <ThemeProvider theme={theme}>
          <br />
          <Typography variant="h4" align="center">
            Blog
          </Typography>
          <br />
          <GridCards data={blogData} isMobile={true} />
          <br />
        </ThemeProvider>
      </MobileView>
    </div>
  );
}
