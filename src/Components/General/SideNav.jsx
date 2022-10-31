import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/navSideBar.module.css";

const SideNav = ({ clientLogin, logout }) => {
  return (
    <nav id={styles.navSide}>
      <h2>Quick Access</h2>
      <ul>
        <li>
          {clientLogin ? (
            <Link to="/createMission">Hire Us!</Link>
          ) : (
            <Link
              to="/createMission"
              onClick={() => {
                alert("Please log in before creating a mission.");
              }}
            >
              Hire Us!
            </Link>
          )}
        </li>
        <li>
          <Link to="/members">Member List</Link>
        </li>
        <li>
          {clientLogin ? (
            <Link to="/clientLogin" onClick={logout}>
              Log out
            </Link>
          ) : (
            <Link to="/clientLogin">Client Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
