import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import validator from "validator";
import { AxiosError } from "axios";
import { ResponseError } from "../../types/ResponseError";
import { useAuth } from "../../context/AuthContext";

type UserData = {
  email: string;
  password: string;
};

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
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const navigate = useNavigate();

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

  const handleLogin = async (userData: UserData): Promise<boolean> => {
    try {
      setLoading(true);
      await login(userData);

      return true;
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      if (error.response) {
        const { name, message } = error.response.data as ResponseError;
        setErrors((prev) => {
          return {
            ...prev,
            [name]: message,
          };
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errs: UserDataErrors = {
      email: validateEmail(userData.email),
      password: validatePassword(userData.password),
    };

    setErrors(errs);

    for (const message of Object.values(errs)) {
      if (message !== "") {
        return;
      }
    }

    const result = await handleLogin(userData);

    if (!result) {
      return;
    }

    navigate("/", { replace: true });
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
      <Button
        type="submit"
        variant="contained"
        onClick={handleLoginClicked}
        size="large"
        disabled={loading}
      >
        {loading ? "Loading..." : "Log in"}
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
