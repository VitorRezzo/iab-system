import { useRef, useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  Avatar,
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
  setDataCompanionForm,
  setDecrementAmoutForm
} from "../../../../shared/redux/slices/camera-file-slice/CompanionFormSlice";
import { removeImageMultUrls } from "../../../../shared/redux/slices/camera-file-slice/CameraFileSlice";
import { useDispatch, useSelector } from "react-redux";
import URLToFile from "../../../../shared/features/URLToFile";

export function CompanionForm(props) {
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();

  const [opendialog, setOpenDialog] = useState(false);
  const [vheight, setVHeight] = useState(0);
  const HeightPaper = "140px";
  const [ageP, setAgeP] = useState(0);
  const [dataCompanion, setDataCompanion] = useState();

  const { idPatient } = useParams();
  const formRef = useRef(null);

  const dataImage = useSelector((state) => state.cameraFileMenu);
  const dataCom = useSelector((state) => state.CompanionForm);
  const dispatch = useDispatch();
  useEffect(async () => {
    if (idPatient !== ":idPatient" && props.stateForm !== "new") {
      const response = await ApiServer.post(
        `/get-patients-byid/${idPatient}`,
        null,
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        return response.data.Companions[props.position];
      });

      dispatch(
        setImageMultUrls([
          response.Avatar !== undefined ? "/files/" + response.Avatar.url : ""
        ])
      );

      const datasCompanion = {
        ...response,
        status: response.Status.status,
        state: response.Address.state,
        county: response.Address.county,
        district: response.Address.district,
        street: response.Address.street
      };
      setDataCompanion(datasCompanion);
      formRef.current?.setData(datasCompanion);
    }
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
    const imageFilename = URLToFile.convertUrlToFile(
      dataImage.imageMultUrls[props.position]
    );
    const url = await ApiServer.post(
      `/upload-avatar/${dataform.cpf}`,
      imageFilename
    ).then((response) => {
      return response.data;
    });

    dataform.avatarurl = url;
    dataform.PatientId = idPatient;
    await ApiServer.post("/register-companion", dataform, {
      headers: {
        "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
      }
    })
      .then(() => {
        setDataCompanion((newdata) => [...newdata, dataform]);
        setMessageAlert(`Ficha ${props.position + 1} Gravada!`);
        setOpenMessageAlert(true);
        setTypeAlert("success");
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const handleSaveFile = (position, data) => {
    if (
      dataCom.dataCompanionForm[position - 1]?.cpf === undefined &&
      position !== 0
    ) {
      setMessageAlert("Favor Gravar Ficha " + position + " !");
      setOpenMessageAlert(true);
      setTypeAlert("warning");
    } else {
      dispatch(setDataCompanionForm([data]));
      setDataCompanion(data);
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
    if (datacad[position]?.id !== undefined) {
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
          datacad.splice(props.position, 0, datasCompanion);
          formRefAco.current?.setData(newObj);
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
        {props.stateForm === "new" && dataCompanion?.cpf === undefined ? (
          <SRButton
            sx={{
              background: "#F29F05"
            }}
            onClick={() => {
              formRefAco.current?.submitForm();
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
            props.stateForm === "new" && dataCompanion?.cpf === undefined
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
            height: vheight === 0 ? "100%" : HeightPaper
          }}
          elevation={5}
        >
          <Grid container spacing={0.5}>
            <Grid item xs={2}>
              <img
                src={PinoAcom}
                style={{
                  marginTop: "-10%",
                  marginLeft: "10%",
                  width: "55px",
                  height: "55px"
                }}
              />
            </Grid>
            {dataCompanion?.cpf && vheight === HeightPaper ? (
              <Grid container>
                <Grid item xs={4}>
                  <Avatar
                    src={dataImage.imageMultUrls[props.position]}
                    sx={{
                      width: "100px",
                      height: "100px",
                      marginTop: "-6%",
                      marginLeft: "50%"
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h4"
                    sx={{
                      marginTop: "1%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      fontSize: "2rem",
                      textOverflow: "ellipsis"
                    }}
                    component="span"
                  >
                    {dataCompanion?.fullname}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography
                sx={{ marginTop: "1.8%", marginLeft: "15%", color: "#085A8C" }}
                alt="Dados do Acompanhante"
                variant="h4"
                noWrap
                component="span"
              >
                Ficha do Acompanhante {props.position + 1}
              </Typography>
            )}
            <Grid item xs={12}>
              <IconButton
                sx={{
                  marginLeft: "95%",
                  marginTop: "-9%"
                }}
                onClick={() =>
                  vheight === HeightPaper
                    ? setVHeight(0)
                    : setVHeight(HeightPaper)
                }
              >
                {vheight !== 0 ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
          <Form
            ref={formRef}
            onSubmit={(data) => {
              idPatient !== ":idPatient"
                ? registerCompanion(data)
                : handleSaveFile(props.position, data);
            }}
          >
            <Grid
              container
              sx={{
                marginTop: "2%",
                padding: "2%",
                display: vheight !== 0 ? "none" : ""
              }}
              spacing={2}
            >
              <Grid item xs={10} />
              <Grid item xs={2}>
                <Typography
                  sx={{ color: "#085A8C" }}
                  alt="Codigo Acompanhante"
                  variant="h6"
                  noWrap
                  component="span"
                >
                  CDAC - 0000
                </Typography>
              </Grid>
              <Grid item xs={4} />

              <Grid item xs={4}>
                <CameraFileMenu type="mult" position={props.position} />
              </Grid>

              <Grid item xs={4} />

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ color: "#085A8C" }}
                  variant="h6"
                  noWrap
                  component="span"
                >
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
                <Typography
                  sx={{ color: "#085A8C" }}
                  variant="h6"
                  noWrap
                  component="span"
                >
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
