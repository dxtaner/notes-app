import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [token, setToken] = useState(localStorage.getItem("online-notes"));

  useEffect(() => {
    setToken(localStorage.getItem("online-notes"));
  }, [token]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        {!token && (
          <>
            <li>
              <Link to="/auth/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className="nav-link">
                Login
              </Link>
            </li>
          </>
        )}

        {token && (
          <>
            <li>
              <Link to="/create" className="nav-link">
                Create Note
              </Link>
            </li>
          </>
        )}

        <li>
          <Link to="/aboutus" className="nav-link">
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
