import React from "react";
import styles from "./css/LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = ({
  header,
  label,
  username,
  setUsername,
  password,
  setPassword,
  register,
  onSubmit,
}) => {
  return (
    <div className={styles.login}>
      <h2>{header}</h2>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <div className="form-group row">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            {label}
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="InputPassword2" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="InputPassword2"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          {/* <small id="passwordHelp" className="form-text text-light">
            Forgot your password?
          </small> */}
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
        <button type="submit" className="btn btn-primary col-md-6 offset-md-3">
          Login
        </button>
      </form>
      <div style={{ textAlign: "center" }}>
        <Link to={register}>New here? Register now!</Link>
      </div>
    </div>
  );
};

export default LoginForm;
