import React, { useContext, useEffect, useState } from "react";
import ApiServer from "../../services/ApiServer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAlertMessageContext } from "../context/AlertMessageContext";
const AutenticaUser = React.createContext();

export function useAutenticaUser() {
  return useContext(AutenticaUser);
}

export function AutenticaUserProvider({ children }) {
  const navigate = useNavigate();
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();
  const [userLog, setUserLog] = useState();

  const VerificaAutentica = async () => {
    if (!Cookies.get(process.env.REACT_APP_TOKEN)) {
      navigate("/");
    } else {
      await ApiServer.post(
        "/verify-AuthUser",
        {
          username: localStorage.getItem("--username")
        },
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        if (response.data.auth === false) {
          setOpenMessageAlert(true);
          setMessageAlert(response.data.message);
          setTypeAlert("warning");
          setTimeout(() => {
            Cookies.remove(process.env.REACT_APP_TOKEN, { path: "" });
            localStorage.setItem("--auth", response.data.auth);
            navigate("/");
            setOpenMessageAlert(false);
          }, 3750);
        }
        localStorage.setItem("--auth", response.data.auth);
        setUserLog(localStorage.getItem("--username"));
      });
    }
  };

  useEffect(() => {
    VerificaAutentica();
  }, []);

  const value = {
    setUserLog,
    userLog,
    VerificaAutentica
  };

  return (
    <AutenticaUser.Provider value={value}>
      {children}
      <AlertMessage />
    </AutenticaUser.Provider>
  );
}
