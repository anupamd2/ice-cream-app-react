import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectUsername } from "./services/Auth/AuthSelectors";
import LoginForm from "./pages/Auth/Login/LoginForm";
import RegisterForm from "./pages/Auth/Register/RegisterForm";
import Dashboard from "./pages/Dashboard/Dashboard";

const loginRoute = "/login";
const registerRoute = "/register";
const dashboardRoute = "/dashboard";
const all = "*";

function AppRouter() {
  const username = useAppSelector(selectUsername);
  const loggedIn = username === undefined ? false : true;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={loginRoute}
          element={!loggedIn ? <LoginForm /> : <Navigate to={dashboardRoute} />}
        />
        <Route
          path={registerRoute}
          element={
            !loggedIn ? <RegisterForm /> : <Navigate to={dashboardRoute} />
          }
        />
        <Route
          path={dashboardRoute}
          element={loggedIn ? <Dashboard /> : <Navigate to={loginRoute} />}
        />
        <Route path={all} element={<Navigate to={loginRoute} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
