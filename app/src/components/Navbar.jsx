import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Button component={NavLink} to="/dashboard" variant="contained" size="large">
              Dashboard
            </Button>
          </li>
          <li>
            <Button component={NavLink} to="/profile" variant="outlined" size="large">
              Profile
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
};
