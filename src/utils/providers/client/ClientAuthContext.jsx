import React from "react";
import { useContext, useState, useMemo } from "react";

import { infoToast } from "../../hooks/useToast";

const AuthContext = React.createContext({});

export const ClientAuthContext = (props) => {
  const contextValue = {};

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
