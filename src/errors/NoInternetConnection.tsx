import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import networkError from "../assets/networkError.png";

const NoInternetConnection = (props: { children: React.ReactNode }) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);
  const navigate = useNavigate();

  // On initialization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return <>{props.children}</>;
  }

  return (
    <Box
      sx={{
        bgcolor: "#E6E9EB",
        py: 4,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          py: 8,
          px: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={networkError} alt="Network Error" style={{ marginBottom: 24 }} />
        <Typography variant="h6" color="textPrimary" gutterBottom>
          No Internet Connection
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          No internet connection was found. Check your connection or try again.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => navigate("/")}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
};

export default NoInternetConnection;
