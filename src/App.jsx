import "./App.css";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Components/General/Navigation";
import Members from "./Components/Members/Members";
import About from "./Components/General/About";
import MissionBoard from "./Components/Missions/MissionBoard";
import NewMission from "./Components/Missions/NewMission";
// import SideNav from "./Components/General/SideNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
//import useFetch from "./Hooks/useFetch";
import usePagination from "./Hooks/usePagination";
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
import MembersInfo from "./Components/Members/MembersInfo";
import SearchMission from "./Components/Missions/SearchMission";
import PageNotFound from "./Components/General/PageNotFound";
global.API_ENDPOINT = "http://ec2-3-93-186-167.compute-1.amazonaws.com:3001";

function App() {
  const [members, setMembers] = useState([]); // Member List
  const [missions, setMissions] = useState([]); // Mission List
  // const [clients, setClients] = useState(false); // Client List - no longer stored client-side
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
    getMembers();
    getMissions();
    getRaces();
    getSpecs();
    getRanks();
  }, []);

  const infoToast = (message, type = "info") => {
    if (type === "info") {
      toast.info(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } else if (type === "success") {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  };

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

  const getRaces = async () => {
    const res = await fetch(API_ENDPOINT + "/races");
    const data = await res.json();

    setRaces(data);
  };

  const getRanks = async () => {
    const res = await fetch(API_ENDPOINT + "/races/ranks");
    const data = await res.json();

    setRanks(data);
  };

  const getSpecs = async () => {
    const res = await fetch(API_ENDPOINT + "/specs");
    const data = await res.json();

    setSpecializations(data);
  };

  // const getMember = async (id) => {
  //   const res = await fetch(API_ENDPOINT + `/members/${id}`);
  //   const data = await res.json();

  //   return data;
  // };

  const getMembers = async () => {
    const res = await fetch(API_ENDPOINT + "/members");
    const data = await res.json();

    setMembers(data);
  };

  const getMissions = async () => {
    const res = await fetch(API_ENDPOINT + "/missions");
    const data = await res.text();

    setMissions(JSON.parse(data));
  };

  // const getClients = async () => {
  //   const res = await fetch(API_ENDPOINT + "/clients");
  //   const data = await res.text();

  //   setClients(JSON.parse(data));
  // };

  // Member Stuff

  const memberLogin = async (member) => {
    // Returns true if password is valid for given member
    const res = await fetch(API_ENDPOINT + "/members/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });
    const data = await res.json();
    return data;
  };

  const memberLogout = () => {
    infoToast(
      `Logging you out, ${currentMember.full_name}. Please come again.`
    );
    setCurrentMemberID(false);
    setMemberLoggedIn(false);
  };

  const addMember = async (member, specs) => {
    await fetch(API_ENDPOINT + "/register/member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });

    await fetch(API_ENDPOINT + "/register/member/spec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(specs),
    });

    setTimeout(() => getMembers(), 1000);
  };

  const editMember = async (member, specs) => {
    await fetch(API_ENDPOINT + "/members/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });

    await fetch(API_ENDPOINT + "/members/edit/specs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(specs),
    });

    setTimeout(() => getMembers(), 1000);
    getMissions();
  };

  // Mission Stuff

  const addMission = async (mission) => {
    console.log(mission);
    const res = await fetch(API_ENDPOINT + "/missions/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    });
    const data = res.text();
    console.log(data);
    getMissions();
  };

  // Client Stuff

  const clientLogin = async (client) => {
    const res = await fetch(API_ENDPOINT + "/clients/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    });
    const data = await res.json();
    return data;
  };

  const clientLogout = () => {
    infoToast(
      `Logging you out, ${currentClient.organization}. Please come again.`
    );
    setCurrentClient(false);
    setClientLoggedIn(false);
  };

  const handleSelectMember = (member) => {
    setSelectedMemberID(member.member_id);
  };

  const handleSelectMission = (mission) => {
    setSelectedMissionID(mission.mission_num);
  };

  const createClient = async (client) => {
    await fetch(API_ENDPOINT + "/register/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    });
  };

  const editClient = async (client) => {
    await fetch(API_ENDPOINT + "/clients/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    });

    getMissions();
  };

  const editMission = async (mission) => {
    await fetch(API_ENDPOINT + "/missions/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    });

    getMissions();
  };

  const addMissionReport = async (report) => {
    await fetch(API_ENDPOINT + "/missions/reports/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });

    getMissions();
  };

  const editMissionReport = async (details, id) => {
    await fetch(API_ENDPOINT + `/missions/reports/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });

    getMissions();
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
          toast={infoToast}
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
              <Members
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
                toast={infoToast}
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
              <EditMission
                mission={selectedMission}
                toast={infoToast}
                onEdit={editMission}
              />
            }
          />

          {clientLoggedIn ? (
            <Route
              path="/missions/create"
              element={
                <NewMission
                  onAdd={addMission}
                  client={currentClient}
                  toast={infoToast}
                />
              }
            />
          ) : (
            <Route
              path="/missions/create"
              element={
                <ClientLogin
                  clientLogin={clientLogin}
                  setLogin={setClientLoggedIn}
                  setClient={setCurrentClient}
                  toast={infoToast}
                />
              }
            />
          )}
          {memberLoggedIn ? (
            <Route
              path="/missions/info/:id/reports/new"
              element={
                <NewReport
                  mission={selectedMission}
                  member={currentMember}
                  toast={infoToast}
                  onPost={addMissionReport}
                />
              }
            />
          ) : (
            <Route
              path="/missions/info/:id/reports/new"
              element={
                <MemberLogin
                  memberLogin={memberLogin}
                  members={members}
                  setMember={setCurrentMemberID}
                  setSelect={setSelectedMemberID}
                  setLogin={setMemberLoggedIn}
                  toast={infoToast}
                />
              }
            />
          )}
          <Route
            path="/account/client/login"
            element={
              <ClientLogin
                clientLogin={clientLogin}
                setLogin={setClientLoggedIn}
                setClient={setCurrentClient}
                toast={infoToast}
              />
            }
          />
          <Route
            path="/account/member/login"
            element={
              <MemberLogin
                memberLogin={memberLogin}
                members={members}
                setMember={setCurrentMemberID}
                setSelect={setSelectedMemberID}
                setLogin={setMemberLoggedIn}
                toast={infoToast}
              />
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
                <MemberLogin
                  memberLogin={memberLogin}
                  members={members}
                  setMember={setCurrentMemberID}
                  setSelect={setSelectedMemberID}
                  setLogin={setMemberLoggedIn}
                  toast={infoToast}
                />
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
                onEdit={editMember}
                toast={infoToast}
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
                onAdd={addMember}
                toast={infoToast}
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
            element={
              <CreateClient
                onAdd={createClient}
                toast={infoToast}
                clientLogin={clientLogin}
                setLogin={setClientLoggedIn}
                setClient={setCurrentClient}
              />
            }
          />
          <Route
            path="/account/client/info/edit"
            element={
              <EditClient
                client={currentClient}
                toast={infoToast}
                onEdit={editClient}
                clientLogin={clientLogin}
                setClient={setCurrentClient}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
