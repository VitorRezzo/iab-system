import React, { useContext, useState } from "react";

const CadDataContext = React.createContext();

export function useCadDataContext() {
  return useContext(CadDataContext);
}

export function CadDataContextProvider({ children }) {
  const [datacad, setDataCad] = useState([]);
  const [dataMove, setDataMove] = useState([]);

  const [quantform, setQuantForm] = useState(0);
  const value = {
    quantform,
    setQuantForm,
    datacad,
    setDataCad,
    setDataMove,
    dataMove
  };

  return (
    <CadDataContext.Provider value={value}>{children}</CadDataContext.Provider>
  );
}
