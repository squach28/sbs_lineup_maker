import { Container, Typography } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
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
        Welcome back!
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;
