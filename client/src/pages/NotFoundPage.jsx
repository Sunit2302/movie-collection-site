import React from "react";
import { Box, Button, Typography, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon, Error as ErrorIcon } from "@mui/icons-material"; // Import icons for visual enhancement
import { useMediaQuery } from "@mui/material";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Check if it's a small screen

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      flexDirection="column"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: "500px", width: "100%" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} textAlign="center">
            <ErrorIcon color="error" sx={{ fontSize: 80 }} />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" gutterBottom>
              404 - Page Not Found
            </Typography>
            <Typography variant="body1" paragraph>
              Sorry, the page you're looking for doesn't exist or has been
              moved.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoBack}
              startIcon={<HomeIcon />}
              fullWidth={isSmallScreen} // Make button full-width on small screens
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
