import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  return (
    <>
    <nav>
        <ul>
            <li>
                <NavLink to="/">
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to="/profile">
                    Profile
                </NavLink>
            </li>
        </ul>
    </nav>
    </>
  )
}
