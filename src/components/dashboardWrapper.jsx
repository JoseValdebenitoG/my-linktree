import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/dashboardWrapper.module.css";
import logoBSD from "../../public/logoCircle.png";

export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav className={style.nav}>
        <img src={logoBSD} className={style.logo} />
        <div className={style.navMenu}>
          <Link className={style.navMenuItem} to="/dashboard">
            Links
          </Link>
          <Link className={style.navMenuItem} to="/dashboard/profile">
            Profile
          </Link>
          <Link className={style.navMenuItem} to="/signout">
            Signout
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
