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

  const checkUserLog = async () => {
    await ApiServer.post(
      "/check-AuthUser",
      {
        id: localStorage.getItem("--userid")
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      if (response?.data?.auth === false) {
        setOpenMessageAlert(true);
        setMessageAlert(response.data.message);
        setTypeAlert("warning");
        setTimeout(() => {
          Cookies.remove(process.env.REACT_APP_TOKEN, { path: "" });
          navigate("/");
          setOpenMessageAlert(false);
        }, 3750);
      }
      response.data?.username
        ? setUserLog(response.data?.username)
        : navigate("/");
    });
  };

  useEffect(() => {
    checkUserLog();
  }, []);

  const value = {
    setUserLog,
    userLog
  };

  return (
    <AutenticaUser.Provider value={value}>
      {children}
      <AlertMessage />
    </AutenticaUser.Provider>
  );
}
