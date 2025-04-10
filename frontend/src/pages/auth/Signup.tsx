import { Container, Typography } from "@mui/material";
import SignupForm from "../../components/auth/SignupForm";

const Signup = () => {
  return (
    <Container
      sx={{
        p: 2,
        maxWidth: {
          md: "500px",
          lg: "500px",
        },
      }}
    >
      <Typography variant="h4" component="h1">
        Welcome!
      </Typography>
      <SignupForm />
    </Container>
  );
};

export default Signup;
