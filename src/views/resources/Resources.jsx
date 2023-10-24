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
    description: "Brown's Official Site",
    image: brownSite,
    link: "https://www.brown.edu/",
  },
  {
    title: "CAB",
    description: "Courses @ Brown",
    image: cabSite,
    link: "https://cab.brown.edu/",
  },
];

export default function Resources() {
  const [view, setView] = useState("grid");

  return (
    <BrowserView>
      <ThemeProvider theme={theme}>
        <br />
        <Typography variant="h4" align="center">
          Useful Resources
        </Typography>
        <br />
        <div
          style={{
            width: "80%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {view === "grid" ? (
            <>
              <Button
                variant="contained"
                style={{ marginRight: "0.5rem" }}
                onClick={() => setView("grid")}
              >
                Grid View
              </Button>
              <Button variant="outlined" onClick={() => setView("list")}>
                List View
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                style={{ marginRight: "0.5rem" }}
                onClick={() => setView("grid")}
              >
                Grid View
              </Button>
              <Button variant="contained" onClick={() => setView("list")}>
                List View
              </Button>
            </>
          )}
        </div>
        <br />
        <div style={{ width: "80%", margin: "auto" }}>
          <Paper elevation={3} style={{ padding: "1rem" }}>
            <Box m={4}>
              <Grid container spacing={4}>
                {linksData.map((item) => (
                  <Grid item xs={view === "grid" ? 4 : 12} key={item.title}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200vh"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography>{item.description}</Typography>
                        <br />
                        <Button
                          style={{ marginRight: "0.5rem" }}
                          variant="outlined"
                        >
                          More Info
                        </Button>
                        <Button variant="contained" target="_blank" href={item.link}>
                          Website
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </div>
      </ThemeProvider>
    </BrowserView>
  );
}
