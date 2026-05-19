import { Link, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/");
  };

  return (

    <nav className="navbar">

      <h1>
        TaskFlow
      </h1>

      <div className="nav-links">

        <Link to="/home">
          Home
        </Link>

        <Link to="/add-task">
          Add Task
        </Link>

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;