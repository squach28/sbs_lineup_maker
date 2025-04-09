import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PageNotFound from "./pages/PageNotFound";
import AuthRequired from "./layouts/AuthRequired";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRequired />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
