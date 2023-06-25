import React from "react";
import { Router } from "./router/reception-routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login-page/LoginPage";
import { MenuDrawer } from "./shared/components/reception-components/menu-drawer/MenuDrawer";
import { AutenticaUserProvider } from "./shared/context/AutenticaUser";
import { AlertMessageContextProvider } from "./shared/context/AlertMessageContext.jsx";
import { Theme } from "./shared/theme/theme";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Theme>
        <AlertMessageContextProvider>
          <LoginPage>
            <AutenticaUserProvider>
              <MenuDrawer>
                <Router />
              </MenuDrawer>
            </AutenticaUserProvider>
          </LoginPage>
        </AlertMessageContextProvider>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
