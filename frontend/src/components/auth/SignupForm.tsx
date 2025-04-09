import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router";
import validator from "validator";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UserDataErrors = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const MINIMUM_PASSWORD_LENGTH = 6;

const SignupForm = () => {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<UserDataErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSignupClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errs: UserDataErrors = {
      firstName: validateFirstName(userData.firstName),
      lastName: validateLastName(userData.lastName),
      email: validateEmail(userData.email),
      password: validatePassword(userData.password),
      confirmPassword: validateConfirmPassword(userData.confirmPassword),
    };

    for (const message of Object.values(errs)) {
      if (message !== "") {
        setErrors(errs);
        return;
      }
    }

    console.log("all good");
  };

  const validateFirstName = (firstName: string) => {
    if (validator.isEmpty(firstName)) {
      return "First name is required";
    }

    return "";
  };

  const validateLastName = (lastName: string) => {
    if (validator.isEmpty(lastName)) {
      return "Last name is required";
    }

    return "";
  };

  const validateEmail = (email: string) => {
    if (validator.isEmpty(email)) {
      return "Last name is required";
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

    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      return "Password must be at least 6 characters ";
    }

    return "";
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (validator.isEmpty(confirmPassword)) {
      return "Confirm password is required";
    }
    if (userData.password !== confirmPassword) {
      return "Passwords do not match";
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
      <Typography variant="h5" component="h1">
        Sign up
      </Typography>
      <TextField
        id="firstName"
        name="firstName"
        type="text"
        label="First Name"
        error={errors.firstName !== ""}
        helperText={
          errors.firstName ? (
            <Typography component="span" color="error">
              {errors.firstName}
            </Typography>
          ) : null
        }
        fullWidth
        onChange={onInputChange}
        value={userData.firstName}
      />

      <TextField
        id="lastName"
        name="lastName"
        type="text"
        label="Last Name"
        error={errors.lastName !== ""}
        helperText={
          errors.lastName ? (
            <Typography component="span" color="error">
              {errors.lastName}
            </Typography>
          ) : null
        }
        fullWidth
        onChange={onInputChange}
        value={userData.lastName}
      />

      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        error={errors.email !== ""}
        helperText={
          errors.email ? (
            <Typography component="span" color="error">
              {errors.email}
            </Typography>
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
            <Typography component="span" color="error">
              {errors.password}
            </Typography>
          ) : null
        }
        fullWidth
        onChange={onInputChange}
        value={userData.password}
      />

      <TextField
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        error={errors.confirmPassword !== ""}
        helperText={
          errors.confirmPassword ? (
            <Typography component="span" color="error">
              {errors.confirmPassword}
            </Typography>
          ) : null
        }
        fullWidth
        onChange={onInputChange}
        value={userData.confirmPassword}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        onClick={handleSignupClicked}
      >
        Sign up
      </Button>
      <Typography
        sx={{
          mx: "auto",
        }}
      >
        Already have an account?{" "}
        <Link to="/login" className="text-blue-700">
          Log in
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
