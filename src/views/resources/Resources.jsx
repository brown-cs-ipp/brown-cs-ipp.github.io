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
import "./Resources.css";
import brownSite from "./Brown-Site.jpg";
import cabSite from "./CAB.png";
import csDept from "./CS-Dept.png";
import brownConnect from "./Brown-Connect.png";
import handshake from "./Handshake.png";
import climateTech from "./Climate-Tech.png";
import recruiting from "./recruiting.png";
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

const linksData = [
  {
    title: "Brown Site",
    description: "Brown's Official Site.",
    image: brownSite,
    link: "https://www.brown.edu/",
  },
  {
    title: "CAB",
    description: "Courses @ Brown.",
    image: cabSite,
    link: "https://cab.brown.edu/",
  },
  {
    title: "Handshake",
    description:
      "Handshake is Brown’s online recruiting platform for students and alumni that simplifies the search for internships, jobs and learning opportunities.",
    image: handshake,
    link: "https://brown.joinhandshake.com/login",
  },
  {
    title: "BrownConnect",
    description:
      "BrownConnect links students, alumni, parents and friends to extend learning beyond the classroom and promote mentoring and professional growth long past graduation.",
    image: brownConnect,
    link: "https://brownconnect.brown.edu/ds/index",
  },
  {
    title: "CS Department Site",
    description: "Official Site of the CS Department.",
    image: csDept,
    link: "https://cs.brown.edu/",
  },
  {
    title: "ClimateTechList",
    description:
      "Tracking hundreds of early career jobs, university internships, & fellowships from 1,003 climate tech companies.",
    image: climateTech,
    link: "https://www.climatetechlist.com/university",
  },
  {
    title: "Recruiting Policies for Students",
    description: "Student Recruitment Guidelines and Policies.",
    image: recruiting,
    link: "https://career-center.brown.edu/jobs-internships/recruiting/recruiting-policies-students",
  },
];

export default function Resources() {
  return (
    <div>
      <BrowserView>
        <ThemeProvider theme={theme}>
          <br />
          <Typography variant="h4" align="center">
            Useful Resources
          </Typography>
          <br />
          <GridCards data={linksData} isMobile={false} />
          <br />
        </ThemeProvider>
      </BrowserView>
      <MobileView>
        <ThemeProvider theme={theme}>
          <br />
          <Typography variant="h4" align="center">
            Useful Resources
          </Typography>
          <br />
          <GridCards data={linksData} isMobile={true} />
          <br />
        </ThemeProvider>
      </MobileView>
    </div>
  );
}
