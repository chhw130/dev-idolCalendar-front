import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUsers,
  faHome,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getCookie } from "../../cookie/cookie";
import styles from "./SideBar.module.scss";

const SideBar = () => {
  const adminName = getCookie("isLogin").nickname;

  return (
    <div className={styles.adminPage}>
      <div className={styles.sideBar}>
        <div className={styles.sideBarUser}>
          <img alt="" />
          <div className={styles.sideBarTitle}>
            <FontAwesomeIcon icon={faUserGear} />
            {adminName}
          </div>
        </div>
        <nav className={styles.sideBarNav}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navAble}` : `${styles.navDisable}`
            }
            to="/admin/main"
          >
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            Main
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navAble}` : `${styles.navDisable}`
            }
            to="/admin/idollist"
          >
            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
            idolList
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.navAble}` : `${styles.navDisable}`
            }
            to="/admin/report"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            ReportTable
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default SideBar;
