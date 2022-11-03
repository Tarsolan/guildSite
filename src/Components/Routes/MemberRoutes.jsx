import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateMember from "../Account-Management/Members/CreateMember";
import EditMember from "../Account-Management/Members/EditMember";
import MemberDisplay from "../Account-Management/Members/MemberDisplay";
import MemberLogin from "../Account-Management/Members/MemberLogin";
import PageNotFound from "../General/PageNotFound";
import AllMembersList from "../Members/AllMembersList";
import MembersInfo from "../Members/cardInfo/MembersInfo";

const MemberRoutes = ({ memberPackage }) => {
  const {
    memberLoggedIn,
    members,
    member,
    handleSelect,
    selectedMember,
    handleLogin,
    selectMission,
    onAdd,
    onEdit,
    miscData,
  } = memberPackage;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AllMembersList members={members} handleSelect={handleSelect} />
        }
      />
      <Route
        path="/info/:id"
        element={
          <MembersInfo selectedMember={selectedMember} members={members} />
        }
      />
      <Route
        path="/account/login"
        element={<MemberLogin members={members} handleLogin={handleLogin} />}
      />

      <Route
        path="/account/register"
        element={
          <CreateMember members={members} onAdd={onAdd} miscData={miscData} />
        }
      />

      {memberLoggedIn && (
        <>
          <Route
            path="/account/info"
            element={
              <MemberDisplay member={member} selectMission={selectMission} />
            }
          />
          <Route
            path="/account/info/edit"
            element={
              <EditMember
                member={member}
                members={members}
                onEdit={onEdit}
                miscData={miscData}
              />
            }
          />
        </>
      )}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MemberRoutes;
