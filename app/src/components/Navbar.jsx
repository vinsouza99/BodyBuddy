import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Button
              component={NavLink}
              to="/dashboard"
              variant="contained"
              sx={{
                backgroundColor: "#cccccc",
                color: "#999999",
                "&:hover": {
                  backgroundColor: "#999999",
                  color: "white",
                },
              }}
            >
              Dashboard
            </Button>
          </li>
          <li>
            <Button
              component={NavLink}
              to="/profile"
              variant="outlined"
              sx={{
                backgroundColor: "#ffffff",
                color: "#999999",
                border: "1px solid #999999",
                "&:hover": {
                  backgroundColor: "#eeeeee",
                  color: "black",
                },
              }}
            >
              Profile
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
};
