import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Modal,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

export default function GridCards({ data, isMobile }) {
  // console.log(data);
  const [openModal, setOpenModal] = useState({});

  const handleOpen = (title) => {
    setOpenModal({ ...openModal, [title]: true });
  };

  const handleClose = (title) => {
    setOpenModal({ ...openModal, [title]: false });
  };

  const xs = isMobile ? 12 : 4;

  const modalStyle = isMobile
    ? {
        position: "absolute",
        top: "0%",
        left: "0%",
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
      }
    : {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "75vw",
        maxHeight: "75vh",
        padding: "2rem",
        boxShadow: 24,
        overflowY: "auto",
      };

  return (
    <Box style={{ width: "90%", margin: "auto" }}>
      <Grid container spacing={6} alignItems="stretch">
        {data.map((item) => (
          <Grid item xs={xs} key={item.title}>
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
                {item.date && (
                  <div>
                    <br />
                    <Typography variant="body1">Date: {item.date}</Typography>
                  </div>
                )}
                {item.location && (
                  <div>
                    <br />
                    <Typography variant="body1">
                      Location: {item.location}
                    </Typography>
                  </div>
                )}
                {item.inlineDescription && (
                  <div>
                    <br />
                    <Typography>{item.inlineDescription}</Typography>
                  </div>
                )}
              </CardContent>
              <Box p={2} display="flex" justifyContent="flex-end">
                {item.description && (
                  <Button
                    variant="contained"
                    onClick={() => handleOpen(item.title)}
                  >
                    Read More
                  </Button>
                )}
                {item.link && (
                  <Button variant="contained" target="_blank" href={item.link}>
                    Website
                  </Button>
                )}
                <Modal
                  open={openModal[item.title] || false}
                  onClose={() => handleClose(item.title)}
                >
                  <Card style={modalStyle}>
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
  );
}
