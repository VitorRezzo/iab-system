import { SRButton } from "../../../../shared/styles/reception-styles/StylecadP";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { removeImageMultUrls } from "../../../../shared/redux/slices/camera-file-slice/CameraFileSlice";
import {
  removeDataCapanionForm,
  setDecrementAmoutForm,
  setOpenDialogForm
} from "../../../../shared/redux/slices/camera-file-slice/CompanionFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext";
import { useMemo } from "react";

export const ButtonsSaveDelete = ({ id, position, formRef }) => {
  const dataImage = useSelector((state) => state.cameraFileMenu);
  const companion = useSelector((state) => state.companionForm);
  const dispatch = useDispatch();

  const { setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();
  const handleRemoveFile = async (position) => {
    if (dataImage.imageMultUrls[position]) {
      dispatch(removeImageMultUrls(position));
    }
    dispatch(removeDataCapanionForm(position));
    dispatch(setDecrementAmoutForm(1));
    setMessageAlert(`Ficha ${position + 1} foi removida `);
    setOpenMessageAlert(true);
    setTypeAlert("info");
  };

  const isSave = useMemo(() => {
    return companion.dataCompanionForm[position] === undefined ? false : true;
  }, [companion?.dataCompanionForm[position]]);

  return (
    <>
      {isSave ? (
        <SRButton
          sx={{
            background: "#03A63C"
          }}
        >
          <Button
            sx={{ color: "#FFFF", marginTop: "4%" }}
            startIcon={<CheckCircleIcon />}
          >
            Salvo
          </Button>
        </SRButton>
      ) : (
        <SRButton
          sx={{
            background: "#F29F05"
          }}
          onClick={() => {
            formRef.current?.submitForm();
          }}
        >
          <Button
            sx={{ color: "#FFFF", marginTop: "4%" }}
            startIcon={<SaveIcon />}
          >
            Gravar
          </Button>
        </SRButton>
      )}
      <SRButton
        sx={{
          marginLeft: "7%",
          background: "#BF0404"
        }}
        onClick={() => {
          isSave && id !== ":idPatient"
            ? dispatch(setOpenDialogForm(true))
            : handleRemoveFile(position);
        }}
      >
        <Button
          sx={{ color: "#FFFF", marginTop: "4%" }}
          startIcon={<DeleteForeverIcon />}
        >
          Remover
        </Button>
      </SRButton>
    </>
  );
};
