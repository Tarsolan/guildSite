import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  member: {},
  isAdmin: false,
  login: (member) => {},
  logout: () => {},
});

// storage can go here

export const MemberAuthContext = (props) => {
  const [member, setMember] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const loginHandler = (member) => {
    setMember(member);
    member.is_admin && setIsAdmin(true);
  };

  const logoutHandler = () => {
    setMember({});
    setIsAdmin(false);
  };

  const contextValue = {
    member: member,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
