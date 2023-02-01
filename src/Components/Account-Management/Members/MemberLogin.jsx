import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { successToast, errorToast } from "../../../utils/hooks/useToast";
import { memberLogin } from "../../../api/services/members/memberLogin";

import MemberContext from "../../../utils/providers/members/AllMemberContext";
import AuthContext from "../../../utils/providers/members/MemberAuthContext";

import LoginForm from "../../UI/LoginForm";

const MemberLogin = ({ members, handleLogin }) => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const memCtx = useContext(MemberContext);

  const navigate = useNavigate();
  const goToMemberInfo = () => navigate("/members/account/info");

  const confirmLogin = async (e) => {
    let match = false;
    var selectedMember = {};
    e.preventDefault();

    memCtx.members.forEach((member) => {
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
    <LoginForm
      header="Member Login"
      label="Title (Username)"
      username={title}
      setUsername={setTitle}
      password={password}
      setPassword={setPassword}
      register="/members/account/register"
      onSubmit={confirmLogin}
    />
  );
};

export default MemberLogin;
