import "./App.css";
import { ToastContainer, infoToast } from "./utils/hooks/useToast";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Components/General/Navigation";
import AllMembersList from "./Components/Members/AllMembersList";
import About from "./Components/General/About";
import MissionBoard from "./Components/Missions/MissionBoard";
import NewMission from "./Components/Missions/NewMission";
// import SideNav from "./Components/General/SideNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
//import useFetch from "./Hooks/useFetch";
import usePagination from "./utils/hooks/usePagination";
import ClientLogin from "./Components/Account-Management/Clients/ClientLogin";
// import MemberInfo from "./Components/Members/MemberInfo";
import Footer from "./Components/General/Footer";
import MemberLogin from "./Components/Account-Management/Members/MemberLogin";
import MemberDisplay from "./Components/Account-Management/Members/MemberDisplay";
import CreateMember from "./Components/Account-Management/Members/CreateMember";
import EditMember from "./Components/Account-Management/Members/EditMember";
import ClientDisplay from "./Components/Account-Management/Clients/ClientDisplay";
import CreateClient from "./Components/Account-Management/Clients/CreateClient";
import EditClient from "./Components/Account-Management/Clients/EditClient";
import MissionDetail from "./Components/Missions/MissionDetail";
import Background from "./Components/General/Background";
import NewReport from "./Components/Missions/NewReport";
import EditMission from "./Components/Missions/EditMission";
import MembersInfo from "./Components/Members/cardInfo/MembersInfo";
import SearchMission from "./Components/Missions/SearchMission";
import PageNotFound from "./Components/General/PageNotFound";
import {
  getRaces,
  getRanks,
  getSpecs,
} from "./api/services/members/getMiscData";
import { getMissions } from "./api/services/missions/getMissions";
import { getMembers } from "./api/services/members/getMembers";
import { addMember } from "./api/services/members/addMember";
import { editMember } from "./api/services/members/editMember";
import { addClient } from "./api/services/clients/addClient";
import { editClient } from "./api/services/clients/editClient";
import { getClient } from "./api/services/clients/getClients";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function App() {
  const [members, setMembers] = useState([]); // Member List
  const [missions, setMissions] = useState([]); // Mission List
  const [races, setRaces] = useState(false);
  const [ranks, setRanks] = useState(false);
  const [specializations, setSpecializations] = useState(false);
  const [clientLoggedIn, setClientLoggedIn] = useState(false); // True if client is logged in
  const [memberLoggedIn, setMemberLoggedIn] = useState(false); // True if member is logged in
  const [currentClient, setCurrentClient] = useState(false); // Stores info on currently logged in client
  const [currentMemberID, setCurrentMemberID] = useState(false); // Stores info on currently logged in member
  const [selectedMemberID, setSelectedMemberID] = useState(false); // Stores info on currently selected member (for info page)
  const [selectedMissionID, setSelectedMissionID] = useState(false); // Stores info on currently selected mission (for info page)

  useEffect(() => {
    async function getMiscData() {
      const raceData = await getRaces();
      setRaces(raceData);

      const specData = await getSpecs();
      setSpecializations(specData);

      const rankData = await getRanks();
      setRanks(rankData);
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

  // Mission Stuff
  const addMission = async (mission) => {
    const res = await fetch(API_ENDPOINT + "/missions/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    });
    const data = res.text();

    getMissionData();
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

    // getMissionData();
  };

  const editMission = async (mission) => {
    await fetch(API_ENDPOINT + "/missions/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    });

    getMissionData();
  };

  const handleSelectMission = (mission) => {
    setSelectedMissionID(mission.mission_num);
  };

  const addMissionReport = async (report) => {
    await fetch(API_ENDPOINT + "/missions/reports/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });

    getMissionData();
  };

  const editMissionReport = async (details, id) => {
    await fetch(API_ENDPOINT + `/missions/reports/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });

    getMissionData();
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
          <Route path="/" element={<About />}></Route>
          <Route
            path="/members"
            element={
              <AllMembersList
                members={members}
                handleSelect={handleSelectMember}
                pagination={usePagination}
              />
            }
          />
          <Route
            path="/members/info/:id"
            // element={<MemberInfo member={selectedMember} />}
            element={
              <MembersInfo selectedMember={selectedMember} members={members} />
            }
          />
          <Route path="/about" element={<About />}></Route>
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
                members={members}
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
              <EditMission mission={selectedMission} onEdit={editMission} />
            }
          />

          {clientLoggedIn ? (
            <Route
              path="/missions/create"
              element={<NewMission onAdd={addMission} client={currentClient} />}
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
          <Route
            path="/account/client/login"
            element={<ClientLogin handleLogin={clientLogin} />}
          />
          <Route
            path="/account/member/login"
            element={
              <MemberLogin members={members} handleLogin={memberLogin} />
            }
          />
          <Route
            path="/account/member/info"
            element={
              memberLoggedIn ? (
                <MemberDisplay
                  member={currentMember}
                  selectMission={setSelectedMissionID}
                />
              ) : (
                <MemberLogin members={members} handleLogin={memberLogin} />
              )
            }
          />
          <Route
            path="/account/member/info/edit"
            element={
              <EditMember
                races={races}
                specializations={specializations}
                ranks={ranks}
                member={currentMember}
                members={members}
                onEdit={memberEdit}
                setMember={setCurrentMemberID}
              />
            }
          />
          <Route
            path="/register/member"
            element={
              <CreateMember
                races={races}
                specializations={specializations}
                ranks={ranks}
                members={members}
                onAdd={newMember}
              />
            }
          />
          <Route
            path="/account/client/info"
            element={
              <ClientDisplay
                client={currentClient}
                missionInfo={missions}
                handleSelect={setSelectedMissionID}
              />
            }
          />
          <Route
            path="/register/client"
            element={<CreateClient onAdd={createClient} />}
          />
          <Route
            path="/account/client/info/edit"
            element={<EditClient client={currentClient} onEdit={clientEdit} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
