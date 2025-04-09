import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { UserData } from "../../types/UserData";
import { Link } from "react-router";
import validator from "validator";

type UserDataErrors = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<UserDataErrors>({
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

  const handleLoginClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emailError = validateEmail(userData.email);
    const passwordError = validatePassword(userData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });
  };

  const validateEmail = (email: string) => {
    if (validator.isEmpty(email)) {
      return "Email is required";
    }

    if (!validator.isEmail(email)) {
      return "Email is invalid";
    }

    return "";
  };

  const validatePassword = (password: string) => {
    if (validator.isEmpty(password)) {
      return "Password is required";
    }

    return "";
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
        error={errors.email !== ""}
        helperText={
          errors.email ? (
            <Typography color="error">{errors.email}</Typography>
          ) : null
        }
        fullWidth
        onChange={onInputChange}
        value={userData.email}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        error={errors.password !== ""}
        helperText={
          errors.password ? (
            <Typography color="error">{errors.password}</Typography>
          ) : null
        }
        fullWidth
        onChange={onInputChange}
        value={userData.password}
      />
      <Button
        type="submit"
        variant="contained"
        onClick={handleLoginClicked}
        size="large"
      >
        Log in
      </Button>
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
