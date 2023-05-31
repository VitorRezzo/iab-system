import React, { useContext, useState } from "react";

const CadDataContext = React.createContext();

export function useCadDataContext() {
  return useContext(CadDataContext);
}

export function CadDataContextProvider({ children }) {
  const [dataMove, setDataMove] = useState([]);

  const value = {
    setDataMove,
    dataMove
  };

  return (
    <CadDataContext.Provider value={value}>{children}</CadDataContext.Provider>
  );
}
