import React from "react";
import { Router } from "./router/reception-routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login-page/LoginPage";
import { MenuDrawer } from "./shared/components/reception-components/menu-drawer/MenuDrawer";
import { AutenticaUserProvider } from "./shared/context/AutenticaUser";
import { AlertMessageContextProvider } from "./shared/context/AlertMessageContext.jsx";
function App() {
  return (
    <BrowserRouter>
      <AlertMessageContextProvider>
        <LoginPage>
          <AutenticaUserProvider>
            <MenuDrawer>
              <Router />
            </MenuDrawer>
          </AutenticaUserProvider>
        </LoginPage>
      </AlertMessageContextProvider>
    </BrowserRouter>
  );
}

export default App;
