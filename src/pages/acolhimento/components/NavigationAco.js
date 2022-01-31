export default function NavigationAco  (index,navigate)  {

   
       switch (index){
            case 0:
            navigate('/Acolhimento');
            break;
            case 1:
                navigate('/CadastroAco');
                break;
                case 2:
                navigate('/RelatorioAco');
                break;
            default:
            navigate('/Acolhimento');
            break;
    }

  
  }
