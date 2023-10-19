import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import "./Resources.css";

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

export default function Resources() {
  const [links] = useState([
    { name: "Brown CS Department", url: "https://cs.brown.edu/" },
    { name: "Canvas", url: "https://canvas.brown.edu/" },
    { name: "GitHub", url: "https://github.com/" },
    { name: "Stack Overflow", url: "https://stackoverflow.com/" },
  ]);

  return (
    <BrowserView>
      <ThemeProvider theme={theme}>
        <Typography variant="h4">Useful Links</Typography>

        <List>
          {links.map((link) => (
            <ListItem key={link.name}>
              <ListItemText
                primary={
                  <Link href={link.url} target="_blank" rel="noopener">
                    {link.name}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </ThemeProvider>
    </BrowserView>
  );
}
