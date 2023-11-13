import { useState, useRef, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  Box,
  Typography,
  InputAdornment,
  Divider,
  Avatar,
  Modal,
  Checkbox,
  FormControl,
  FormControlLabel
} from "@mui/material";

import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MapIcon from "@mui/icons-material/Map";

import { styled } from "@mui/material/styles";
import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";
import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext";

import { VAutoCompleteMove } from "../../../../shared/components/form-unform/VAutoCompleteMove.tsx";
import { VTimePicker } from "../../../../shared/components/form-unform/VTimePicker.tsx";
import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { VAutoComplete } from "../../../../shared/components/form-unform/VAutoComplete.tsx";
import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";

import ListProcedimento from "../../../../constants/ListProcedimento.json";
import BackgroundPages from "../../../../assets/img/BackgroundPages.svg";
import { Form } from "@unform/web";
import { useParams } from "react-router-dom";
import useDebounce from "../../../../shared/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { SchendulesTable } from "./SchendulesTable";
const TextFieldUI = styled(VTextField)({
  "& label.Mui-focused": {
    color: "#0D0D0D"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#17f9ff"
  },

  "& .MuiOutlinedInput-root": {
    color: "#0D0D0D",
    "& fieldset": {
      borderColor: "#005bc5",
      borderRadius: "20px"
    },
    "&:hover fieldset": {
      borderColor: "#17f9ff"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#17f9ff"
    }
  }
});

export function SchendulesForm() {
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();

  const [openModal, setOpenModal] = useState(false);
  const [checkCompanion, setCheckCompanion] = useState([]);
  const [companionList, setCompanionList] = useState([]);
  const [moveData, setMoveData] = useState([]);
  const navigate = useNavigate();
  const { idPmove } = useParams();
  const formRefMove = useRef(null);

  useEffect(async () => {
    if (idPmove !== ":idPmove") {
      await ApiServer.post(`/get-movements-byid/${idPmove}`, null, {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }).then((response) => {
        formRefMove.current?.setData({
          fullname: response.data.Patient.fullname,
          procedure: response.data.procedure,
          origin: response.data.origin,
          destiny: response.data.destiny,
          transport: response.data.transport,
          date: response.data.date,
          hour: response.data.hour
        });
      });
    }
  }, [idPmove]);

  const searchCompanionsById = async () => {
    setOpenModal(true);
    for (var i = 0; i < moveData[0].idCompanion.length; i++) {
      await ApiServer.post(
        `/get-companions-byid/${moveData[0].idCompanion[i].id}`,
        null,
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        setCompanionList([response.data]);
      });
    }
  };

  const handleChangeChecked = (event) => {
    if (event.target.checked) {
      setCheckCompanion((value) => [
        ...value,
        {
          id: event.target.id,
          fullname: event.target.name
        }
      ]);
    } else {
      checkCompanion.splice(
        checkCompanion.findIndex((item) => item.id === event.target.id),
        1
      );
    }
  };

  const handleSave = async (data) => {
    data.id = idPmove;
    data.idPatient = moveData[0].id;
    data.idStatus = moveData[0].idStatus;
    data.idCompanion = checkCompanion;

    if (idPmove === ":idPmove") {
      await ApiServer.post("/register-movements", data, {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }).then(() => {
        setOpenMessageAlert(true);
        setMessageAlert("Movimento Cadastrado!");
        setTypeAlert("success");
        setTimeout(() => {
          navigate(0);
        }, 4000);
      });
    } else {
      await ApiServer.put("/update-movements", data, {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }).then(() => {
        setOpenMessageAlert(true);
        setMessageAlert("Movimento Atualizado!");
        setTypeAlert("success");
        setTimeout(() => {
          navigate(0);
        }, 4000);
      });
    }
  };

  const searchPatientByName = async (name) => {
    if (name.length > 2) {
      await ApiServer.post(
        "/search-patient-bynameorcpf",
        {
          fullname: name
        },
        {
          headers: {
            "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
          }
        }
      ).then((response) => {
        setMoveData(
          response.data.map((value) => ({
            id: value.id,
            idStatus: value.StatusId,
            idCompanion: value.Companions,
            label: value.fullname,
            Avatar: `${process.env.REACT_APP_BACKEND}/files/${value.Avatar.url}`
          }))
        );
      });
    }
  };

  const debouncedsearchPatientByName = useDebounce(searchPatientByName, 500);

  return (
    <Box>
      <AlertMessage />

      <SchendulesTable data={moveData} />
      <Grid container spacing={2} sx={{ padding: "2%" }}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Paper
            elevation={1}
            sx={{
              marginTop: "2%",
              width: "100%",
              background: "#f0f0f0",
              paddingBottom: "2%"
            }}
          >
            <Form ref={formRefMove} onSubmit={(data) => handleSave(data)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "1%",
                      color: "#005bc5"
                    }}
                  >
                    <AssignmentIndIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                        marginTop: "0.2%",
                        marginRight: "1%"
                      }}
                    />
                    <Typography variant="h2">Dados</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Avatar
                    sx={{
                      marginTop: "2%",
                      marginLeft: "40%",
                      width: "100px",
                      height: "100px"
                    }}
                    src={
                      moveData[0]?.Avatar !== undefined
                        ? moveData[0]?.Avatar
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={5} sx={{ marginTop: "2%", marginLeft: "15%" }}>
                  <VAutoCompleteMove
                    placeholder="Nome"
                    name="fullname"
                    size="small"
                    onChange={(e) =>
                      debouncedsearchPatientByName(e.target.value)
                    }
                    moveData={moveData}
                  />
                </Grid>
                <Grid item xs={2.6}>
                  <VAutoComplete
                    variant="outlined"
                    placeholder="procedimento"
                    size="small"
                    name="procedure"
                    option={ListProcedimento}
                    sx={{ marginTop: "9%" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "1%",
                      color: "#005bc5"
                    }}
                  >
                    <MapIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                        marginTop: "0.2%",
                        marginRight: "1%"
                      }}
                    />
                    <Typography variant="h2">Localização</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={3.5}>
                  <TextFieldUI
                    label="Origem"
                    variant="outlined"
                    size="small"
                    name="origin"
                    sx={{ marginLeft: "2% " }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GpsFixedOutlinedIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextFieldUI
                    label="Destino"
                    variant="outlined"
                    size="small"
                    name="destiny"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnOutlinedIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextFieldUI
                    label="Locomoção"
                    variant="outlined"
                    size="small"
                    name="transport"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DriveEtaIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextFieldUI
                    label="Valor"
                    variant="outlined"
                    size="small"
                    type="number"
                    name="price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PaidOutlinedIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "1%",
                      color: "#005bc5"
                    }}
                  >
                    <DateRangeIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                        marginTop: "0.2%",
                        marginRight: "1%"
                      }}
                    />
                    <Typography variant="h2">Data & Hora</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item sx={{ marginLeft: "30%" }} xs={2}>
                  <VDatePick name="date" />
                </Grid>
                <Grid item xs={2}>
                  <VTimePicker name="hour" />
                </Grid>

                <Grid item xs={2} sx={{ marginLeft: "80%", marginTop: "1%" }}>
                  <Button
                    color="success"
                    variant="contained"
                    sx={{ borderRadius: "20px" }}
                    onClick={() => {
                      searchCompanionsById();
                    }}
                  >
                    Gravar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Paper>
        </Grid>
      </Grid>

      <Modal open={openModal} describedby="modal-ListAcompanhantes">
        <Paper
          sx={{
            position: "absolute",
            top: "10%",
            left: "40%",
            width: 450,
            backgroundImage: `url(${BackgroundPages})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
          elevation={5}
        >
          <Typography variant="h2" sx={{ marginLeft: "15%" }}>
            Escolha um Acompanhante
          </Typography>
          {companionList?.map((value, index) => (
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "2%",
                color: "#005bc5"
              }}
              component="fieldset"
              variant="standard"
              key={index}
            >
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "2%",
                  marginTop: "2%"
                }}
                src={
                  companionList[index].Avatar?.url !== undefined
                    ? `${process.env.REACT_APP_BACKEND}/files/${companionList[index].Avatar?.url}`
                    : ""
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: "#fd9407" }}
                    name={value.fullname}
                    id={value.id.toString()}
                  />
                }
                onChange={handleChangeChecked}
                label={value.fullname}
              />

              <Divider />
            </FormControl>
          ))}
          <Box sx={{ marginTop: "5%" }}>
            <Button
              color="error"
              onClick={() => {
                setOpenModal(false);
                setCheckCompanion([]);
              }}
              variant="contained"
              sx={{ marginLeft: "3%", width: "100px" }}
            >
              Cancelar
            </Button>
            <Button
              color="warning"
              variant="contained"
              sx={{ marginLeft: "50%", width: "100px" }}
              onClick={() => {
                formRefMove.current?.submitForm();
                setOpenModal(false);
                setCheckCompanion([]);
              }}
            >
              Finalizar
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
