import React from "react";
import { useContext, useState, useMemo } from "react";

import { infoToast } from "../../hooks/useToast";

const MissionContext = React.createContext({});

export const MissionDataContext = (props) => {
  const contextValue = {};

  return (
    <MissionContext.Provider value={contextValue}>
      {props.children}
    </MissionContext.Provider>
  );
};

export default MissionContext;
