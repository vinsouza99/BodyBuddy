import { NavLink } from "react-router-dom";

export function Landing() {
  return (
    <>
      <header>
        <div className="logo-wrapper">
          <h1>Logo</h1>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="#about">About</NavLink>
            </li>
            <li>
              <NavLink to="#contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/signin">Sign in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Landing Page</h2>
      </main>
    </>
  );
}
