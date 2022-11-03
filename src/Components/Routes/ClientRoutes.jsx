import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientDisplay from "../Account-Management/Clients/ClientDisplay";
import ClientLogin from "../Account-Management/Clients/ClientLogin";
import CreateClient from "../Account-Management/Clients/CreateClient";
import EditClient from "../Account-Management/Clients/EditClient";
import PageNotFound from "../General/PageNotFound";

const ClientRoutes = ({ clientPackage }) => {
  const {
    clientLogin,
    client,
    selectMission,
    missions,
    createClient,
    editClient,
    clientLoggedIn,
  } = clientPackage;

  return (
    <Routes>
      <Route
        path="/login"
        element={<ClientLogin handleLogin={clientLogin} />}
      />
      <Route path="/register" element={<CreateClient onAdd={createClient} />} />

      {clientLoggedIn && (
        <>
          <Route
            path="/info"
            element={
              <ClientDisplay
                client={client}
                missionInfo={missions}
                handleSelect={selectMission}
              />
            }
          />
          <Route
            path="/info/edit"
            element={<EditClient client={client} onEdit={editClient} />}
          />
        </>
      )}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ClientRoutes;
