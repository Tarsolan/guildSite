import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./css/memberLogin.module.css";
import { successToast, errorToast } from "../../../utils/hooks/useToast";
import { memberLogin } from "../../../api/services/members/memberLogin";
import AuthContext from "../../../utils/providers/MemberContextControl";

const MemberLogin = ({ members, handleLogin }) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const goToMemberInfo = () => navigate("/members/account/info");

  const confirmLogin = async (e) => {
    let match = false;
    var selectedMember = {};
    e.preventDefault();

    members.forEach((member) => {
      if (member.title === title) {
        match = true;
        selectedMember = member;
      }
    });

    if (!match) {
      setTitle("");
      setPassword("");
      return errorToast("Invalid entry. That member does not exist.");
    }

    let loginStatus = await memberLogin({ title, password });

    if (loginStatus) {
      successToast(`Login confirmed. Welcome, ${title}.`);
      handleLogin(selectedMember);

      goToMemberInfo();
    } else {
      errorToast(`Invalid password. Please try again.`);
      setPassword("");
    }
  };

  return (
    <div className={styles.memberLogin}>
      <h2>Member Login</h2>
      <form className={styles.loginForm} onSubmit={confirmLogin}>
        <div className="form-group">
          <label htmlFor="memTitle">Member Title</label>
          <input
            type="text"
            className="form-control"
            id="memTitle"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword2">Password</label>
          <input
            type="password"
            className="form-control"
            id="InputPassword2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <small id="passwordHelp" className="form-text text-light">
            Forgot your password?
          </small>
        </div>
        {/* <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="gridCheck"
            onChange={() => {
              toggleRemember(!remember);
            }}
          />
          <label className="form-check-label" htmlFor="gridCheck">
            Remember Me
          </label>
        </div> */}
        <br />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Link to="/register/member">New here? Register as a member!</Link>
    </div>
  );
};

export default MemberLogin;
