import { Container, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h5" component="h1">
        What would you like to do?
      </Typography>
      <OptionList />
    </Container>
  );
};

const OptionList = () => {
  return (
    <ul>
      <li>Create a lineup</li>
      <li>Add a paddler</li>
    </ul>
  );
};

export default Dashboard;
