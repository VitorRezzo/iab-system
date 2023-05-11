import React, { useContext, useState } from "react";
import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Companions = React.createContext();

export function useListCompanions() {
  return useContext(Companions);
}

export function CompanionsProvider({ children }) {
  const [companionsList, setCompanionsList] = useState([]);

  useEffect(() => {
    setCompanionsList([]);
  }, []);

  const listAllCompanions = async () => {
    await ApiServer.get("/list-Allcompanions", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        setCompanionsList((prevent) => [...prevent, response.data[i]]);
      }
    });
    return;
  };

  const value = {
    setCompanionsList,
    companionsList,
    listAllCompanions
  };

  return <Companions.Provider value={value}>{children}</Companions.Provider>;
}
