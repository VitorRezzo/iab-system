import { useRef, useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogActions
} from "@mui/material";

import Cookies from "js-cookie";

import { ListMuni } from "../../../../constants/ListMuni";

import ListTipoVicios from "../../../../constants/ListTipoVicios.json";
import ListEscolaridade from "../../../../constants/ListEscolaridade.json";
import ListGenero from "../../../../constants/ListGenero.json";
import ListTipoRenda from "../../../../constants/ListTipoRenda.json";
import ListReligiao from "../../../../constants/ListReligiao.json";
import ListProfissao from "../../../../constants/ListProfissao.json";
import ListStatus from "../../../../constants/ListStatus.json";
import ListTipoSanguineo from "../../../../constants/ListTipoSanguineo.json";
import ListGrauParentesco from "../../../../constants/ListGrauParentesco.json";
import LisEstados from "../../../../constants/ListEstados.json";
import ListFormasUniao from "../../../../constants/ListFormasUniao.json";
import ListStatusCivil from "../../../../constants/ListStatusCivil.json";

import SaveIcon from "@mui/icons-material/Save";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { VAutoComplete } from "../../../../shared/components/form-unform/VAutoComplete.tsx";
import { VTextFieldMasks } from "../../../../shared/components/form-unform/VTextFieldMasks.tsx";
import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";

import PinoAcom from "../../../../assets/img/pino.png";

import { Form } from "@unform/web";
import { SRButton } from "../../../../shared/styles/reception-styles/StylecadP";
import ApiServer from "../../../../services/ApiServer.js";
import { useParams } from "react-router-dom";
import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext";

import { CameraFileMenu } from "../../../../shared/components/reception-components/camera-file-menu/CameraFileMenu";
import { setImageMultUrls } from "../../../../shared/redux/slices/camera-file-slice/CameraFileSlice";
import {
  removeDataCapanionForm,
  setDecrementAmoutForm,
  setDataCompanionForm
} from "../../../../shared/redux/slices/camera-file-slice/CompanionFormSlice";
import {
  removeImageMultUrls,
  resetImageMultUrls
} from "../../../../shared/redux/slices/camera-file-slice/CameraFileSlice";
import { useDispatch, useSelector } from "react-redux";
import UploadImageFile from "../../../../shared/feature/UploadImageFile";

export function CompanionForm(props) {
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();

  const [opendialog, setOpenDialog] = useState(false);
  const [vheight, setVHeight] = useState(0);
  const HeightPaper = "140px";
  const [ageP, setAgeP] = useState(0);
  const { idPatient } = useParams();
  const formRef = useRef(null);
  const dataImage = useSelector((state) => state.cameraFileMenu);
  const dataCom = useSelector((state) => state.CompanionForm);
  const dispatch = useDispatch();

  useEffect(async () => {
    const controller = new AbortController();
    if (idPatient !== ":idPatient" && props.state !== "new") {
      dispatch(resetImageMultUrls(0));
      const response = await ApiServer.post(
        `/get-patients-byid/${idPatient}`,
        null,
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        },
        {
          signal: controller.signal
        }
      ).then((response) => {
        return response.data.Companions[props.position];
      });

      dispatch(
        setImageMultUrls(
          response?.Avatar !== null
            ? `${process.env.REACT_APP_BACKEND}/files/${response.Avatar.url}`
            : ""
        )
      );

      const datasCompanion = {
        ...response,
        status: response?.Status.status,
        state: response?.Address.state,
        county: response?.Address.county,
        district: response?.Address.district,
        street: response?.Address.street
      };

      formRef.current?.setData(datasCompanion);
    }

    return () => {
      controller.abort();
      dispatch(resetImageMultUrls(0));
    };
  }, [idPatient]);

  const handleChangeAge = (newDate) => {
    const d = new Date();
    if (newDate !== null) {
      const age = Math.floor(
        Math.ceil(
          Math.abs(newDate.getTime() - d.getTime()) / (1000 * 3600 * 24)
        ) / 365.25
      );
      if (age < 1000) {
        setAgeP(age);
      }
    }
  };

  const registerCompanion = async (dataform) => {
    if (dataImage.imageMultUrls[props.position] !== undefined) {
      UploadImageFile.createUrl(
        dataform,
        dataImage.imageMultUrls[props.position],
        dataform.cpf
      );
    }

    dataform.PatientId = idPatient;
    await ApiServer.post("/register-companion", dataform, {
      headers: {
        "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
      }
    });
  };

  const handleSaveFile = (position, data) => {
    if (
      dataImage.imageMultUrls[position - 1] === undefined &&
      position - 1 > 0
    ) {
      setMessageAlert("Favor Gravar Ficha " + position + " !");
      setOpenMessageAlert(true);
      setTypeAlert("warning");
    } else {
      registerCompanion(data);
      dispatch(setDataCompanionForm([data]));
      setMessageAlert(`Ficha ${position + 1} foi gravado!`);
      setOpenMessageAlert(true);
      setTypeAlert("success");
    }
  };
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
  const removeCompanionAssocitedPatient = async (position) => {
    if (dataCom.dataCompanionForm[position]?.id !== undefined) {
      await ApiServer.post(
        "/search-companion-bynameorcpf",
        {
          cpf: datacad[position].cpf
        },
        {
          headers: {
            "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
          }
        }
      ).then(async (res) => {
        datacad[position].id = res.data[0].id;
      });
    }
    await ApiServer.post(
      "/remove-companion-associted-patient",
      {
        id: datacad[position].id,
        PatientId: idPatient
      },
      {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      }
    ).then(async () => {
      setOpenDialog(false);
      setMessageAlert("Acompanhante Removido");
      setOpenMessageAlert(true);
      setTypeAlert("success");
      handleRemoveFile(position);
    });
  };
  const associateCompanionPatient = async (idAco) => {
    await ApiServer.post(
      "/associate-companion-patient",
      {
        id: idAco,
        PatientId: idPatient
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then(() => {
      setOpenMessageAlert(true);
      setMessageAlert("Acompanhante Associado ao Paciente!");
      setTypeAlert("success");
    });
  };
  const searchCompanionByNameOrCPF = async (cpf) => {
    if (cpf.length === 14 && idPatient !== ":idPatient") {
      await ApiServer.post(
        "/search-companion-bynameorcpf",
        {
          cpf: cpf
        },
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        if (response.data[0].id) {
          dispatch(
            setImageMultUrls([
              response.data[0].Avatar !== null
                ? "/files/" + response.data[0].Avatar.url
                : ""
            ])
          );

          const datasCompanion = {
            ...response.data[0],
            state: response.data[0].Address.state,
            county: response.data[0].Address.county,
            district: response.data[0].Address.district,
            street: response.data[0].Address.street
          };

          formRef.current?.setData(datasCompanion);
          setOpenMessageAlert(true);
          setMessageAlert("Acompanhante já Cadastrado!");
          setTypeAlert("warning");
          setTimeout(() => {
            associateCompanionPatient(response.data[0].id);
          }, 4000);
        }
      });
    }
  };

  const DialogUI = () => {
    return (
      <div>
        <Dialog open={opendialog}>
          <DialogContent>
            <DialogContentText>
              <strong>Deseja desvincular o Acompanhante do Paciente?</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
              sx={{ marginRight: "30%" }}
            >
              Não
            </Button>
            <Button
              onClick={() => {
                removeCompanionAssocitedPatient(props.position);
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

  return (
    <Box
      sx={{
        padding: "1%",
        marginTop: "8%",
        width: "90%"
      }}
    >
      <DialogUI />
      <AlertMessage />

      <Grid container spacing={0.8}>
        {props.position !== null && props.state === "new" ? (
          <SRButton
            sx={{
              background: "#F29F05"
            }}
            onClick={() => {
              formRef.current?.submitForm();
              setVHeight(HeightPaper);
            }}
          >
            <Button
              sx={{ color: "#FFFF", marginTop: "4%" }}
              startIcon={<SaveIcon />}
            >
              Gravar
            </Button>
          </SRButton>
        ) : (
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
        )}
        <SRButton
          sx={{
            marginLeft: "7%",
            background: "#BF0404"
          }}
          onClick={() => {
            props.state === "new"
              ? handleRemoveFile(props.position)
              : setOpenDialog(true);
          }}
        >
          <Button
            sx={{ color: "#FFFF", marginTop: "4%" }}
            startIcon={<DeleteForeverIcon />}
          >
            Remover
          </Button>
        </SRButton>

        <Paper
          sx={{
            minWidth: "100%",
            height: vheight !== 0 ? "100%" : HeightPaper
          }}
          elevation={5}
        >
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <img
                src={PinoAcom}
                style={{
                  width: "55px",
                  height: "55px"
                }}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center"
                }}
                alt="Dados do Acompanhante"
                variant="h1"
                noWrap
                component="span"
              >
                Ficha do Acompanhante {props.position + 1}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() =>
                  vheight !== 0 ? setVHeight(0) : setVHeight(HeightPaper)
                }
              >
                {vheight !== 0 ? (
                  <KeyboardArrowDownIcon color="primary" />
                ) : (
                  <KeyboardArrowUpIcon color="primary" />
                )}
              </IconButton>
            </Grid>
          </Grid>

          <Form
            ref={formRef}
            onSubmit={(data) => {
              handleSaveFile(props.position, data);
            }}
          >
            <Grid
              container
              sx={{
                marginTop: "2%",
                padding: "2%",
                display: vheight === 0 ? "none" : ""
              }}
              spacing={2}
            >
              <Grid item xs={10} />
              <Grid item xs={2}>
                <Typography
                  alt="Codigo Acompanhante"
                  variant="h3"
                  noWrap
                  component="span"
                >
                  CDAC - 0000
                </Typography>
              </Grid>
              <Grid item xs={4} />

              <Grid item xs={4}>
                <CameraFileMenu
                  type="mult"
                  position={props.position}
                  id={idPatient}
                />
              </Grid>

              <Grid item xs={4} />

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h2" noWrap component="span">
                  Dados Pessoais
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <VTextField name="fullname" label="Nome Completo" />
              </Grid>
              <Grid item xs={2}>
                <VTextFieldMasks
                  name="cpf"
                  labeltext="CPF"
                  onChange={(e) => {
                    searchCompanionByNameOrCPF(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2.5}>
                <VDatePick
                  name="birthdate"
                  labels="Data de Nascimento"
                  onChange={(e) => handleChangeAge(e)}
                />
              </Grid>
              <Grid item xs={1}>
                <VTextField
                  inputProps={{ min: 0, style: { textAlign: "center" } }}
                  name="age"
                  label="Idade"
                  data={ageP}
                />
              </Grid>

              <Grid item xs={2}>
                <VAutoComplete
                  name="gender"
                  labels="Genero"
                  option={ListGenero}
                />
              </Grid>

              <Grid item xs={2}>
                <VTextFieldMasks name="contact" labeltext="Contato" />
              </Grid>

              <Grid item xs={3}>
                <VAutoComplete
                  name="schooling"
                  labels="Grau de Instrução"
                  option={ListEscolaridade}
                />
              </Grid>

              <Grid item xs={3}>
                <VAutoComplete
                  name="profession"
                  labels="Profissão"
                  option={ListProfissao}
                />
              </Grid>

              <Grid item xs={3}>
                <VAutoComplete
                  name="wage"
                  labels="Renda"
                  option={ListTipoRenda}
                />
              </Grid>
              <Grid item xs={3}>
                <VAutoComplete
                  name="civilstatus"
                  labels="Status Civil"
                  option={ListStatusCivil}
                />
              </Grid>
              <Grid item xs={3}>
                <VAutoComplete
                  name="formsunion"
                  labels="Formas de União"
                  option={ListFormasUniao}
                />
              </Grid>
              <Grid item xs={2}>
                <VAutoComplete
                  name="bloodtype"
                  labels="Tipo Sanguineo"
                  option={ListTipoSanguineo}
                />
              </Grid>
              <Grid item xs={3}>
                <VAutoComplete
                  name="addiction"
                  labels="Vicios"
                  option={ListTipoVicios}
                />
              </Grid>
              <Grid item xs={3}>
                <VAutoComplete
                  name="religion"
                  labels="Religião"
                  option={ListReligiao}
                />
              </Grid>
              <Grid item xs={3}>
                <VAutoComplete
                  name="kinship"
                  labels="Grau de Parentesco"
                  option={ListGrauParentesco}
                />
              </Grid>
              <Grid item xs={2}>
                <VAutoComplete
                  name="status"
                  labels="Status"
                  option={ListStatus}
                />
              </Grid>
              <Grid item xs={2}>
                <VDatePick name="registerdate" labels="Data do Cadastro" />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ marginTop: "2%" }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h2" noWrap component="span">
                  Endereço
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <VAutoComplete
                  name="state"
                  labels="Estados"
                  option={LisEstados}
                />
              </Grid>
              <Grid item xs={3}>
                <VAutoComplete
                  name="county"
                  labels="Municipios"
                  option={ListMuni}
                />
              </Grid>
              <Grid item xs={3}>
                <VTextField name="district" label="Bairro" />
              </Grid>
              <Grid item xs={3}>
                <VTextField name="street" label="Rua e N°/Avenida" />
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </Grid>
    </Box>
  );
}
