import React from "react";
import { useMemo, useState } from "react";
import { addMember } from "../../../api/services/members/addMember";

import {
  editMember,
  editMemberPoints,
} from "../../../api/services/members/editMember";

import { getData } from "../../../api/services/getData";

const AllMemberContext = React.createContext({
  members: [],
  getMembers: () => {},
  miscData: [],
  getMiscData: () => {},
  selectedMemberID: false,
  setSelectedMemberID: (id) => {},
  newMember: (member, specArr) => {},
  memberEdit: (member, specs) => {},
  memberPointEdit: (point_total, member_id) => {},
});

export const MemberDataContext = (props) => {
  const [members, setMembers] = useState([]); // Member List
  const [miscData, setMiscData] = useState(false);
  const [selectedMemberID, setSelectedMemberID] = useState(false); // Stores info on currently selected member (for info page)

  const selectedMember = useMemo(
    () => members.find((member) => member.member_id === selectedMemberID),
    [members, selectedMemberID]
  );

  const getMemberHandler = async () => {
    const memberData = await getData("/members");
    setMembers(memberData);
  };

  const getMiscDataHandler = async () => {
    const raceData = await getData("/races");
    const specData = await getData("/races/ranks");
    const rankData = await getData("/specs");

    setMiscData({
      races: raceData,
      ranks: rankData,
      specializations: specData,
    });
  };

  const newMember = async (member, specArr) => {
    const newMem = await addMember(member, specArr);
    setMembers([...members, newMem]);
  };

  const memberEdit = async (member, specs) => {
    const editedMem = await editMember(member, specs);
    setMembers(
      members.map((mem) =>
        mem.member_id === editedMem.member_id ? editedMem : mem
      )
    );

    // getMissionData();
  };

  const memberPointEdit = async (point_total, member_id) => {
    await editMemberPoints(point_total, member_id);
    setMembers(
      members.map((mem) =>
        mem.member_id === member_id
          ? { ...selectedMember, point_total: point_total }
          : mem
      )
    );
  };

  const handleSelectMember = (member) => {
    setSelectedMemberID(member.member_id);
  };

  const contextValue = {
    members: members,
    getMembers: getMemberHandler,
    miscData: miscData,
    getMiscData: getMiscDataHandler,
    selectedMember: selectedMember,
    setSelectedMemberID: handleSelectMember,
    newMember: newMember,
    memberEdit: memberEdit,
    memberPointEdit: memberPointEdit,
  };

  return (
    <AllMemberContext.Provider value={contextValue}>
      {props.children}
    </AllMemberContext.Provider>
  );
};

export default AllMemberContext;
