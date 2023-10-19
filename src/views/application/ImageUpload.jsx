import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebase_storage } from "../../firebase/utils";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


const StyledDropzone = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  borderWidth: 2,
  borderRadius: 2,
  borderColor: theme.palette.divider,
  borderStyle: "dashed",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
  width: isBrowser ? "50ch" : "80%",
  height: "2"
}));

function ImageUpload(props) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {disabled, id} = props
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      const storageRef = ref(firebase_storage, `partners/${id}/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("File uploaded successfully: ", downloadURL);
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error uploading file: ", error);
      } finally {
        setUploading(false);
        setFile(null);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <StyledDropzone {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="body1">
          {file ? file.name : "Drop an image of your company logo here, or click to select one."}
        </Typography>
      </StyledDropzone>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={disabled || !file || uploading}
        >
          Upload
        </Button>
        {uploading && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="File uploaded successfully!"
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      </Box>
    </Box>
  );
}

export default ImageUpload;