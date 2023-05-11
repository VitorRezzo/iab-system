import React from "react";

import { LoginPage } from "../../pages/login-page/LoginPage";
import { DashboardPage } from "../../pages/reception-pages/dashboard-menu/DashboardPage";
import { PatientPage } from "../../pages/reception-pages/registration-menu/patient/PatientPage";
import { CompanionPage } from "../../pages/reception-pages/registration-menu/companion/CompanionPage";
import { MovementPage } from "../../pages/reception-pages/registration-menu/movement/MovementPage";
import { ReportPage } from "../../pages/reception-pages/reports-menu/ReportPage";
import { RegisterUserPage } from "../../pages/reception-pages/settings-menu/RegisterUserPage";

import { ChartsPage } from "../../pages/reception-pages/charts-menu/ChartsPage";
import { PPDFReports } from "../../pages/reception-pages/reports-menu/components/PPDFReports";
import { EPDFReports } from "../../pages/reception-pages/reports-menu/components/EPDFReports";
import { TypeCharts } from "../../pages/reception-pages/charts-menu/components/TypeCharts";

import { CadDataContextProvider } from "../../pages/reception-pages/registration-menu/context/CadDataContext";

import { Provider } from "react-redux";

import { store } from "../../shared/redux/store/store";
import { Route, Routes } from "react-router-dom";
export function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/Acolhimento_dashboard" element={<DashboardPage />} />
      <Route exact path="/configura/usuarios" element={<RegisterUserPage />} />
      <Route
        exact
        path="/cadastro/paciente/:idPatient"
        element={
          <Provider store={store}>
            <PatientPage />
          </Provider>
        }
      />
      <Route
        exact
        path="/cadastro/acompanhante/:idCompanion"
        element={
          <Provider store={store}>
            <CompanionPage />
          </Provider>
        }
      />
      <Route
        exact
        path="/cadastro/movimentacao/:idmove"
        element={
          <CadDataContextProvider>
            <MovementPage />
          </CadDataContextProvider>
        }
      />
      <Route exact path="/relatorios" element={<ReportPage />} />
      <Route exact path="/graficos" element={<ChartsPage />} />

      <Route exact path="/gerar/pdfs-e" element={<EPDFReports />} />
      <Route exact path="/gerar/pdfs-p" element={<PPDFReports />} />
      <Route exact path="/gerar/graphs" element={<TypeCharts />} />

      <Route
        exact
        path="*"
        element={<h1>Essa pagina não foi encontrada!</h1>}
      />
    </Routes>
  );
}
