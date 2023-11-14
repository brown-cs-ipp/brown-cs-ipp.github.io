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
  Modal,
  Link,
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
import { create } from "@mui/material/styles/createTransitions";
import { AppBlockingSharp } from "@mui/icons-material";

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
    content: <testComponent />,
  },
];

function BlogCard() {
  const [openModal, setOpenModal] = useState({});

  const handleOpen = (title) => {
    setOpenModal({ ...openModal, [title]: true });
  };

  const handleClose = (title) => {
    setOpenModal({ ...openModal, [title]: false });
  };

  return (
    <Box style={{ width: "30%", marginLeft: "5rem" }}>
      <Card
        align="left"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent style={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2">
            Introducing IPP! Meet our new website.
          </Typography>
          <br />
          <Typography variant="body1">Date: November 13th, 2023</Typography>
          <br />
        </CardContent>
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => handleOpen("title")}>
            Read More
          </Button>
          <Modal
            open={openModal["title"] || false}
            onClose={() => handleClose("title")}
          >
            <Card
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "75vw",
                maxHeight: "75vh",
                padding: "2rem",
                boxShadow: 24,
                overflowY: "auto",
              }}
            >
              <Typography variant="h4" align="center">
                Introducing IPP! Meet our new website.
              </Typography>
              <br />
              <Typography variant="h5">Welcome: What is IPP?</Typography>
              <br />
              <Typography variant="body1">
                The Industry Partners Program is a Brown organization under the
                Computer Science Department that connects the Brown CS community
                with industry opportunities. Primarily, we help undergraduate
                students find fulfilling jobs and internships by networking with
                companies, co-hosting recruitment / career education events, and
                sharing helpful resources to democratize access to information.
                We are committed to helping students explore a diverse range of
                opportunities to find what best suits their needs, including
                applications of technology for social good.
              </Typography>
              <Typography variant="body1">
                Our highly collaborative team consists of undergraduate student
                ambassadors and CS department staff work together to coordinate
                events and initiatives. Student ambassador roles are paid, and
                we are a growing team. If you are interested in joining, be sure
                to keep an eye out for announcements about applications.
              </Typography>
              <br />
              <Typography variant="h5">CS-specific career resources</Typography>
              <br />
              <Typography variant="body1">
                Searching for career opportunities is an unpredictable process
                that can be exciting but challenging. We work to make this
                website a centralized source of reliable information that can
                guide you throughout the process. We host live events (in-person
                and remote accessible), which many students attend to learn more
                about job-searching. Feel free to take a look at our{" "}
                <Link href="#/events">past events</Link> to get an idea of what
                we’ve done before. Whether or not you are a CS concentrator,
                subscribe to the{" "}
                <Link href="https://lists.cs.brown.edu/sympa/subscribe/ipp-annc">
                  IPP mailing list
                </Link>{" "}
                to be notified directly about events.
              </Typography>
              <br />
              <Typography variant="h5">Coming up:</Typography>
              <br />
              <Typography variant="body1">
                On November 14, we will be hosting College-to-Climate for an
                in-person, interactive information session. Be sure to subscribe
                to our mailing list to receive more details and registration
                information for the event!
              </Typography>
              <br />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={() => handleClose("title")}
                  maxHeight="1rem"
                  maxWidth="1rem"
                >
                  Close
                </Button>
              </Box>
              <br />
            </Card>
          </Modal>
        </Box>
      </Card>
    </Box>
  );
}

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
          <BlogCard />
          {/* <GridCards data={blogData} isMobile={true} /> */}
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
          <BlogCard />
          {/* <GridCards data={blogData} isMobile={true} /> */}
          <br />
        </ThemeProvider>
      </MobileView>
    </div>
  );
}
