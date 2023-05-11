import React, { useContext, useState } from "react";
import ApiServer from "../../../../services/ApiServer.js";
import Cookies from "js-cookie";

const Patients = React.createContext();

export function useListPatients() {
  return useContext(Patients);
}

export function PatientsProvider({ children }) {
  const [patientsList, setPatientsList] = useState([]);

  const listAllPatients = async () => {
    await ApiServer.get("/listAll-patients", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        setPatientsList((prevent) => [...prevent, response.data[i]]);
      }
    });

    return;
  };
  const value = {
    patientsList,
    setPatientsList,
    listAllPatients
  };

  return <Patients.Provider value={value}>{children}</Patients.Provider>;
}
