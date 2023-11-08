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

export default function GridCards({ data }) {
  // console.log(data);
  const [openModal, setOpenModal] = useState({});

  const handleOpen = (title) => {
    setOpenModal({ ...openModal, [title]: true });
  };

  const handleClose = (title) => {
    setOpenModal({ ...openModal, [title]: false });
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Box m={4}>
        <Grid container spacing={4} alignItems="stretch">
          {data.map((item) => (
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
                  {/*only show date and location if they are not blank*/}
                  {item.date && (
                    <Typography variant="body1">Date: {item.date}</Typography>
                  )}
                  <br />
                  {item.location && (
                    <Typography variant="body1">
                      Location: {item.location}
                    </Typography>
                  )}
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
  );
}
