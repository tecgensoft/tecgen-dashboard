import { Button, Container, Box, Typography } from "@mui/material";
import { useErrorBoundary } from "react-error-boundary";
import danger from "../assets/danger.png";

const ErrorReturn = () => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Box
      sx={{
        backgroundColor: "#E6E9EB",
        py: 4,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Container
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          py: 10,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Box sx={{ mb: 4 }}>
            <img src={danger} alt="Danger" style={{ maxWidth: "100%" }} />
          </Box>
          <Typography
            variant="h6"
            component="span"
            sx={{ display: "block", fontWeight: "bold", pb: 3 }}
          >
            Something Went Wrong
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2B2B2B", fontWeight: "light" }}
          >
            The page you&apos;re looking for may have been moved or doesn&apos;t
            exist. <br /> Please check the URL or navigate back to the homepage.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={resetBoundary}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorReturn;
