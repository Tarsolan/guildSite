import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../General/PageNotFound";
import EditMission from "../Missions/EditMission";
import MissionBoard from "../Missions/MissionBoard";
import MissionDetail from "../Missions/MissionDetail";
import NewMission from "../Missions/NewMission";
import NewReport from "../Missions/NewReport";
import SearchMission from "../Missions/SearchMission";

const MissionRoutes = ({ missionPackage }) => {
  const {
    missions,
    clientInfo,
    handleSelectMem,
    handleSelect,
    selectedMember,
    onPost,
    onReportEdit,
    memberInfo,
    mission,
    onEdit,
    onAdd,
    member,
  } = missionPackage;

  return (
    <Routes>
      <Route
        path="/all"
        element={
          <MissionBoard missions={missions} handleSelect={handleSelect} />
        }
      />
      <Route
        path="/search"
        element={<SearchMission handleSelect={handleSelect} />}
      />
      <Route
        path="/info/:id"
        element={
          <MissionDetail
            mission={mission}
            clientInfo={clientInfo}
            handleSelectMem={handleSelectMem}
            selectedMember={selectedMember}
            onReportEdit={onReportEdit}
            memberInfo={memberInfo}
          />
        }
      />
      <Route
        path="/info/:id/edit"
        element={<EditMission mission={mission} onEdit={onEdit} />}
      />

      {clientInfo && (
        <Route
          path="/create"
          element={<NewMission onAdd={onAdd} client={clientInfo} />}
        />
      )}

      {member && (
        <Route
          path="/info/:id/reports/new"
          element={
            <NewReport mission={mission} member={member} onPost={onPost} />
          }
        />
      )}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MissionRoutes;
