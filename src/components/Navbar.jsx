import { NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";

import { UserContext } from "../context/UserContext";

import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const { user, setUser } =
    useContext(UserContext);

  const handleLogout = () => {

    setUser(null);

    navigate("/");
  };

  return (

    <nav className="navbar">

      <h1 className="logo">
        <span className="logo-icon">⬡</span> TaskFlow
      </h1>

      <div className="nav-links">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/add-task"
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          ✚ Add Task
        </NavLink>

      </div>

      <div className="right-section">

        <span className="user-name">
          👤 {user?.name}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;