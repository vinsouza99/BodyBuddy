import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
