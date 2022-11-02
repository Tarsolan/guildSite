import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  username: "",
  getUser: (username) => {},
});

// storage can go here

const memberAuthContext = (props) => {
  const [title, setTitle] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const loginHandler = (member) => {
    setTitle(member.title);
    member.admin && setIsAdmin(true);
  };

  const logoutHandler = () => {
    setTitle("");
    setIsAdmin(false);
  };

  const contextValue = {};

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default memberAuthContext;
