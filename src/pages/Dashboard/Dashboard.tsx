import "./Dashboard.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUsername } from "../../services/Auth/AuthSelectors";
import { selectUsers } from "../../services/User/UserSelectors";
import { logout } from "../../services/Auth/AuthSlice";
import IceCreamPreferences from "./components/IceCreamPreferences";

function Dashboard() {
  const username = useAppSelector(selectUsername);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const loggedInUser = users.find((user) => user.username === username);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav className="dashboard-nav">
        <p className="username-header">
          Welcome back, "{loggedInUser?.username}"
        </p>
        <button className="btn logout" onClick={onLogout}>
          Logout
        </button>
      </nav>
      <div className="full-screen-container dashboard-container">
        {loggedInUser && <IceCreamPreferences user={loggedInUser} />}
      </div>
    </div>
  );
}

export default Dashboard;
