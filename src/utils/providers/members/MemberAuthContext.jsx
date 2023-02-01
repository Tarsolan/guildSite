import React from "react";
import { useContext, useState, useMemo } from "react";
import AllMemberContext from "./AllMemberContext";
import { infoToast } from "../../hooks/useToast";

const AuthContext = React.createContext({
  currentMember: {},
  setCurrentMemberID: (id) => {},
  currentMemberID: false,
  login: (member) => {},
  logout: () => {},
  memberLoggedIn: false,
});

export const MemberAuthContext = (props) => {
  const [currentMemberID, setCurrentMemberID] = useState(false); // Stores info on currently logged in member
  const [memberLoggedIn, setMemberLoggedIn] = useState(false); // true if member is logged in

  const memberList = useContext(AllMemberContext); // Access to the list of members

  // Memory
  const currentMember = useMemo(
    () =>
      memberList.members.find((member) => member.member_id === currentMemberID),
    [memberList.members, currentMemberID]
  );

  // Member Stuff
  const memberLogin = (member) => {
    setCurrentMemberID(member.member_id);
    memberList.setSelectedMemberID(member.member_id);
    setMemberLoggedIn(true);
  };

  const memberLogout = () => {
    infoToast(
      `Logging you out, ${currentMember.full_name}. Please come again.`
    );
    setCurrentMemberID(false);
    setMemberLoggedIn(false);
  };

  const contextValue = {
    currentMember: currentMember,
    setCurrentMemberID: setCurrentMemberID,
    login: memberLogin,
    logout: memberLogout,
    memberLoggedIn: memberLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
