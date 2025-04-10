import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

const Navbar = () => {
  const { user } = useAuth();
  return user ? (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography>sbs lineup maker</Typography>
          <Typography sx={{ ml: "auto", color: "white" }}>
            Hi, {user.firstName}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  ) : (
    <Navigate to="/login" />
  );
};

export default Navbar;
