import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./Components/General/About";
import Navigation from "./Components/General/Navigation";
import MissionBoard from "./Components/Missions/MissionBoard";
import NewMission from "./Components/Missions/NewMission";
import { infoToast, ToastContainer } from "./utils/hooks/useToast";
// import SideNav from "./Components/General/SideNav";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLogin from "./Components/Account-Management/Clients/ClientLogin";
import { addClient } from "./api/services/clients/addClient";
import { editClient } from "./api/services/clients/editClient";
import { addMember } from "./api/services/members/addMember";
import { editMember } from "./api/services/members/editMember";
import { getMembers } from "./api/services/members/getMembers";
import {
  getRaces,
  getRanks,
  getSpecs,
} from "./api/services/members/getMiscData";
import { addMission } from "./api/services/missions/addMission";
import { addReport } from "./api/services/missions/addReport";
import { editMission } from "./api/services/missions/editMission";
import { editReport } from "./api/services/missions/editReport";
import { getMissions } from "./api/services/missions/getMissions";
import MemberLogin from "./Components/Account-Management/Members/MemberLogin";
import Background from "./Components/General/Background";
import Footer from "./Components/General/Footer";
import PageNotFound from "./Components/General/PageNotFound";
import EditMission from "./Components/Missions/EditMission";
import MissionDetail from "./Components/Missions/MissionDetail";
import NewReport from "./Components/Missions/NewReport";
import SearchMission from "./Components/Missions/SearchMission";
import ClientRoutes from "./Components/Routes/ClientRoutes";
import MemberRoutes from "./Components/Routes/MemberRoutes";

function App() {
  const [members, setMembers] = useState([]); // Member List
  const [missions, setMissions] = useState([]); // Mission List
  const [miscData, setMiscData] = useState(false);
  const [clientLoggedIn, setClientLoggedIn] = useState(false); // True if client is logged in
  const [memberLoggedIn, setMemberLoggedIn] = useState(false); // True if member is logged in
  const [currentClient, setCurrentClient] = useState(false); // Stores info on currently logged in client
  const [currentMemberID, setCurrentMemberID] = useState(false); // Stores info on currently logged in member
  const [selectedMemberID, setSelectedMemberID] = useState(false); // Stores info on currently selected member (for info page)
  const [selectedMissionID, setSelectedMissionID] = useState(false); // Stores info on currently selected mission (for info page)

  useEffect(() => {
    async function getMiscData() {
      const raceData = await getRaces();
      const specData = await getSpecs();
      const rankData = await getRanks();

      setMiscData({
        races: raceData,
        ranks: rankData,
        specializations: specData,
      });
    }
    getMiscData();
    getMissionData();
    getMemberData();
  }, []);

  // Data fetching
  const getMissionData = async () => {
    const missionData = await getMissions();
    setMissions(missionData);
  };

  const getMemberData = async () => {
    const memberData = await getMembers();
    setMembers(memberData);
  };

  // Memory
  const currentMember = useMemo(
    () => members.find((member) => member.member_id === currentMemberID),
    [members, currentMemberID]
  );

  const selectedMember = useMemo(
    () => members.find((member) => member.member_id === selectedMemberID),
    [members, selectedMemberID]
  );

  const selectedMission = useMemo(
    () => missions.find((mission) => mission.mission_num === selectedMissionID),
    [missions, selectedMissionID]
  );

  // Member Stuff
  const memberLogin = (member_id) => {
    setCurrentMemberID(member_id);
    setSelectedMemberID(member_id);
    setMemberLoggedIn(true);
  };

  const memberLogout = () => {
    infoToast(
      `Logging you out, ${currentMember.full_name}. Please come again.`
    );
    setCurrentMemberID(false);
    setMemberLoggedIn(false);
  };

  const newMember = async (member, specArr) => {
    const newMem = await addMember(member, specArr);
    setMembers([...members, newMem]);
    setCurrentMemberID(newMem.member_id);
    setMemberLoggedIn(true);
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

  const handleSelectMember = (member) => {
    setSelectedMemberID(member.member_id);
  };

  // Client Stuff
  const clientLogin = async (client) => {
    setCurrentClient(client);
    setClientLoggedIn(true);
  };

  const clientLogout = () => {
    infoToast(
      `Logging you out, ${currentClient.organization}. Please come again.`
    );
    setCurrentClient(false);
    setClientLoggedIn(false);
  };

  const createClient = async (client) => {
    const newID = await addClient(client);
    clientLogin({
      client_id: newID.client_id,
      status: true,
      ...client,
      missions: [],
    });
  };

  const clientEdit = async (client) => {
    await editClient(client);
    clientLogin(client);
    setMissions(
      missions.map((mission) => {
        if (client.client_id === mission.client_id) {
          return {
            ...mission,
            contact_name: `${client.first_name} ${client.last_name}`,
            organization: client.organization,
          };
        } else return mission;
      })
    );
  };

  // Mission Stuff
  const createMission = async (mission) => {
    var newMission = await addMission(mission);
    setMissions([...missions, newMission]);
  };

  const missionEdit = async (editedMission) => {
    await editMission(editedMission);
    setMissions(
      missions.map((mission) =>
        mission.mission_num === editedMission.mission_num
          ? editedMission
          : mission
      )
    );
  };

  const handleSelectMission = (mission) => {
    setSelectedMissionID(mission.mission_num);
  };

  // Reports
  const addMissionReport = async (report) => {
    const updatedMission = await addReport(report);
    setMissions(
      missions.map((mission) =>
        mission.mission_num === report.mission_num ? updatedMission : mission
      )
    );
  };

  const editMissionReport = async (details, report) => {
    const updatedMission = await editReport(details, report);
    setMissions(
      missions.map((mission) =>
        mission.mission_num === report.mission_num ? updatedMission : mission
      )
    );
  };

  // Data Packages - should probably move some of this to context or something similar
  const memberPackage = {
    memberLoggedIn,
    members,
    member: currentMember,
    miscData,
    selectedMember,
    handleSelect: handleSelectMember,
    handleLogin: memberLogin,
    selectMission: setSelectedMissionID,
    onAdd: newMember,
    onEdit: memberEdit,
  };

  const clientPackage = {
    clientLogin,
    client: currentClient,
    selectMission: setSelectedMissionID,
    missions,
    createClient,
    editClient: clientEdit,
    clientLoggedIn,
  };

  return (
    <Router>
      <Background />
      <header>
        <Navigation
          loginCheckClient={clientLoggedIn}
          logOutClient={clientLogout}
          loginCheckMember={memberLoggedIn}
          logOutMember={memberLogout}
        />
      </header>

      <main>
        {/* <SideNav clientLogin={clientLogin} logout={clientLogout} /> */}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/members/*"
            element={<MemberRoutes memberPackage={memberPackage} />}
          />
          <Route
            path="/clients/*"
            element={<ClientRoutes clientPackage={clientPackage} />}
          />

          <Route
            path="/missions/all"
            element={
              <MissionBoard
                missions={missions}
                handleSelect={handleSelectMission}
              />
            }
          />
          <Route
            path="/missions/search"
            element={
              <SearchMission
                missions={missions}
                handleSelect={handleSelectMission}
              />
            }
          />
          <Route
            path="/missions/info/:id"
            element={
              <MissionDetail
                mission={selectedMission}
                loginCheck={memberLoggedIn}
                clientCheck={clientLoggedIn}
                clientInfo={currentClient}
                handleSelectMem={handleSelectMember}
                selectedMember={selectedMember}
                onReportEdit={editMissionReport}
                memberInfo={currentMemberID}
              />
            }
          />

          <Route
            path="missions/info/:id/edit"
            element={
              <EditMission mission={selectedMission} onEdit={missionEdit} />
            }
          />

          {clientLoggedIn ? (
            <Route
              path="/missions/create"
              element={
                <NewMission onAdd={createMission} client={currentClient} />
              }
            />
          ) : (
            <Route
              path="/missions/create"
              element={<ClientLogin handleLogin={clientLogin} />}
            />
          )}
          {memberLoggedIn ? (
            <Route
              path="/missions/info/:id/reports/new"
              element={
                <NewReport
                  mission={selectedMission}
                  member={currentMember}
                  onPost={addMissionReport}
                />
              }
            />
          ) : (
            <Route
              path="/missions/info/:id/reports/new"
              element={
                <MemberLogin members={members} handleLogin={memberLogin} />
              }
            />
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
