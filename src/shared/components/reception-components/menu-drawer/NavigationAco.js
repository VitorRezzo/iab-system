export default function NavigationAco(index, navigate) {
  switch (index) {
    case 0:
      navigate("/Acolhimento_dashboard");
      break;
    case 1:
      navigate("/cadastro/paciente/:idPatient");
      break;
    case 2:
      navigate("/cadastro/acompanhante/:idCompanion");
      break;
    case 3:
      navigate("/cadastro/movimentacao/:idmove");
      break;
    case 4:
      navigate("/relatorios");
      break;
    case 5:
      navigate("/graficos");
      break;
    default:
      navigate("/Acolhimento_dashboard");
      break;
  }
}
