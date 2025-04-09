import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { UserData } from "../../types/UserData";
import { Link } from "react-router";

const LoginForm = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Box
      component="form"
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h2">
        Log in
      </Typography>
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        fullWidth
        onChange={onInputChange}
        value={userData.email}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        fullWidth
        onChange={onInputChange}
        value={userData.password}
      />
      <Button variant="contained">Log in</Button>
      <Typography
        variant="body1"
        sx={{
          mx: "auto",
        }}
      >
        Don't have an account?{" "}
        <Link className="text-blue-600" to="/signup">
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
