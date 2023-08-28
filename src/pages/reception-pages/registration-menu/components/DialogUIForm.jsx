import {
  Button,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogActions
} from "@mui/material";
import ApiServer from "../../../../services/ApiServer.js";
import Cookies from "js-cookie";
import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { removeImageMultUrls } from "../../../../shared/redux/slices/camera-file-slice/CameraFileSlice";
import {
  removeDataCapanionForm,
  setDecrementAmoutForm,
  setOpenDialogForm
} from "../../../../shared/redux/slices/camera-file-slice/CompanionFormSlice";
import { useParams } from "react-router-dom";

export const DialogUI = ({ position, formRef }) => {
  const dataCom = useSelector((state) => state.companionForm);
  const dispatch = useDispatch();
  const dataImage = useSelector((state) => state.cameraFileMenu);
  const { idPatient } = useParams();
  const { setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();

  const handleRemoveFile = async (position) => {
    if (dataImage.imageMultUrls[position]) {
      dispatch(removeImageMultUrls(position));
    }
    dispatch(removeDataCapanionForm(position));
    dispatch(setDecrementAmoutForm(1));
    dispatch(setOpenDialogForm(false));
    setMessageAlert("Acompanhante Removido");
    setOpenMessageAlert(true);
    setTypeAlert("success");
  };

  const removeCompanionAssocitedPatient = async (position) => {
    await ApiServer.post(
      "/search-companion-bynameorcpf",
      {
        cpf: formRef.current.getData().cpf
      },
      {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      }
    ).then(async (res) => {
      await ApiServer.post(
        "/remove-companion-associted-patient",
        {
          id: res.data[0].id,
          PatientId: idPatient
        },
        {
          headers: {
            "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
          }
        }
      ).then(async () => {
        handleRemoveFile(position);
      });
    });
  };

  return (
    <div>
      <Dialog open={dataCom.openDialogForm}>
        <DialogContent>
          <DialogContentText>
            <strong>Deseja desvincular o Acompanhante do Paciente?</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(setOpenDialogForm(false));
            }}
            sx={{ marginRight: "30%" }}
          >
            Não
          </Button>
          <Button
            onClick={() => {
              removeCompanionAssocitedPatient(position);
            }}
            sx={{ marginRight: "20%" }}
            autoFocus
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
