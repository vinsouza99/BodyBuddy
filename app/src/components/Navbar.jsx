import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Button
            component={NavLink}
            to="/dashboard"
            variant="text"
            size="large"
            fullWidth
          >
            Dashboard
          </Button>
        </li>
        <li>
          <Button
            component={NavLink}
            to="/profile"
            variant="text"
            size="large"
            fullWidth
          >
            Profile
          </Button>
        </li>
        <li>
          <Button
            component={NavLink}
            to="/training"
            variant="text"
            size="large"
            fullWidth
          >
            Training Program
          </Button>
        </li>
      </ul>
    </nav>
  );
};
