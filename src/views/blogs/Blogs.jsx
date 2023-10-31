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
import "./Blogs.css";
import blog_img from "./blog.jpg";

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

const blogsData = [
  {
    title: "Blog Post 1",
    date: "Jan 1, 2021",
    description: "Description 1",
    image: blog_img,
  },
  {
    title: "Blog Post 2",
    date: "Jan 2, 2021",
    description: "Description 2",
    image: blog_img,
  },
  {
    title: "Blog Post 3",
    date: "Jan 3, 2021",
    description: "Description 3",
    image: blog_img,
  },
  {
    title: "Blog Post 4",
    date: "Jan 4, 2021",
    description: "Description 4",
    image: blog_img,
  },
];

export default function Blogs() {
  return (
    <BrowserView>
      <ThemeProvider theme={theme}>
        <br />
        <Typography variant="h4" align="center">
          Blogs
        </Typography>
        <div style={{ width: "80%", margin: "auto" }}>
          <Box m={4}>
            <Grid container spacing={4} alignItems="stretch">
              {blogsData.map((item) => (
                <Grid item xs={4} key={item.title}>
                  <Card
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
