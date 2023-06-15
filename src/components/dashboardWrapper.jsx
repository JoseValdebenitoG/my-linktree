import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboardWrapper.css";
import logoBSD from "../image/logoCircle.png";

export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav className="navBar">
        <img src={logoBSD} className="logoNavBar" />
        <div className="navMenu">
          <Link className="navMenuItem" to="/dashboard">
            Dashboard
          </Link>
          <Link className="navMenuItem" to="/dashboard/profile">
            Profile
          </Link>
          <Link className="navMenuItem" to="/signout">
            Signout
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
