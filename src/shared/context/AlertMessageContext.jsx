import React, { useContext, useState } from "react";
import { Snackbar, Alert, Box } from "@mui/material";
import LinearProgressUI from "../../shared/components/LinearProgressUI";
import Slide from "@mui/material/Slide";
const AlertMessageContext = React.createContext();

export function useAlertMessageContext() {
  return useContext(AlertMessageContext);
}

export function AlertMessageContextProvider({ children }) {
  const [openmessagealert, setOpenMessageAlert] = useState(false);
  const [messagealert, setMessageAlert] = useState();
  const [typealert, setTypeAlert] = useState();

  const AlertMessage = () => {
    const handleClose = () => {
      setOpenMessageAlert(false);
    };

    return (
      <>
        <Slide
          direction="down"
          in={openmessagealert}
          mountOnEnter
          unmountOnExit
        >
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openmessagealert}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert severity={typealert} sx={{ width: "100%" }}>
              {messagealert}
              <Box sx={{ width: "100%" }}>
                <LinearProgressUI color={typealert} />
              </Box>
            </Alert>
          </Snackbar>
        </Slide>
      </>
    );
  };

  const value = {
    AlertMessage,
    setMessageAlert,
    setOpenMessageAlert,
    setTypeAlert
  };

  return (
    <AlertMessageContext.Provider value={value}>
      {children}
    </AlertMessageContext.Provider>
  );
}
