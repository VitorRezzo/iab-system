import React from "react";

import { LoginPage } from "../../pages/login-page/LoginPage";
import { DashboardPage } from "../../pages/reception-pages/dashboard-menu/DashboardPage";
import { PatientPage } from "../../pages/reception-pages/registration-menu/patient/PatientPage";
import { CompanionPage } from "../../pages/reception-pages/registration-menu/companion/CompanionPage";
import { SchendulesPage } from "../../pages/reception-pages/registration-menu/schendules/SchendulesPage";
import { SchendulesForm } from "../../pages/reception-pages/registration-menu/components/SchendulesForm";
import { MovementsPage } from "../../pages/reception-pages/registration-menu/movement/MovementsPage";
import { ReportPage } from "../../pages/reception-pages/reports-menu/ReportPage";
import { RegisterUserPage } from "../../pages/reception-pages/settings-menu/RegisterUserPage";

import { ChartsPage } from "../../pages/reception-pages/charts-menu/ChartsPage";
import { TypeCharts } from "../../pages/reception-pages/charts-menu/components/TypeCharts";

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
      <Route exact path="/cadastro/agendamentos" element={<SchendulesPage />} />
      <Route
        exact
        path="/cadastro/agendamento-formulario/"
        element={<SchendulesForm />}
      />
      <Route
        exact
        path="/cadastro/movimentos/:idMove"
        element={
          <Provider store={store}>
            <MovementsPage />
          </Provider>
        }
      />
      <Route exact path="/relatorios" element={<ReportPage />} />
      <Route exact path="/graficos" element={<ChartsPage />} />
      <Route exact path="/gerar/graphs" element={<TypeCharts />} />

      <Route
        exact
        path="*"
        element={<h1>Essa pagina não foi encontrada!</h1>}
      />
    </Routes>
  );
}
