import { useRef, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Divider,
  IconButton
} from "@mui/material";

import ApiServer from "../../../../services/ApiServer.js";
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

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { VAutoComplete } from "../../../../shared/components/form-unform/VAutoComplete.tsx";
import { VTextFieldMasks } from "../../../../shared/components/form-unform/VTextFieldMasks.tsx";
import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";

import PinoAcom from "../../../../assets/img/pino.png";

import { Form } from "@unform/web";

import { useParams } from "react-router-dom";
import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext";

import { CameraFileMenu } from "../../../../shared/components/reception-components/camera-file-menu/CameraFileMenu";
import { setImageMultUrls } from "../../../../shared/redux/slices/CameraFileSlice.jsx";

import UploadImageFile from "../../../../shared/feature/UploadImageFile";

import { ButtonsSaveDelete } from "./ButtonsSaveDelete.jsx";

import { DialogUI } from "./DialogUIForm.jsx";

import { setDataCompanionForm } from "../../../../shared/redux/slices/CompanionFormSlice.jsx";
import { useDispatch, useSelector } from "react-redux";

export function CompanionForm(props) {
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();
  const HeightPaper = "146px";
  const [openForm, setOpenForm] = useState(true);
  const [ageP, setAgeP] = useState(0);
  const { idPatient } = useParams();
  const formRef = useRef(null);
  const ScrollRef = useRef(null);
  const dataImage = useSelector((state) => state.cameraFileMenu);

  const dispatch = useDispatch();

  useEffect(async () => {
    if (idPatient !== ":idPatient" && props.state === "save") {
      dispatch(
        setImageMultUrls(
          props.datasCompanion.Avatare?.url !== null
            ? `${process.env.REACT_APP_BACKEND}/files/${props.datasCompanion?.Avatare?.url}`
            : ""
        )
      );

      const datasCompanions = {
        ...props.datasCompanion,
        status: props.datasCompanion?.Status.status,
        kinship: props.kinship,
        state: props.datasCompanion?.Address.state,
        county: props.datasCompanion?.Address.county,
        district: props.datasCompanion?.Address.district,
        street: props.datasCompanion?.Address.street
      };

      dispatch(setDataCompanionForm(datasCompanions));
      formRef.current?.setData(datasCompanions);
    }
    if (props.state === "new") {
      window.scrollTo({ top: ScrollRef.current.offsetTop, behavior: "smooth" });
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
  const associateCompanionPatient = async (data) => {
    const idCompanion = await ApiServer.post(
      "/search-companion-bynameorcpf",
      {
        cpf: formRef.current.getData().cpf
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      return response.data[0].id;
    });
    await ApiServer.post(
      "/associate-companion-patient",
      {
        kinship: formRef.current.getData().kinship,
        PatientId: idPatient,
        id: idCompanion
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    )
      .then((res) => {
        dispatch(setDataCompanionForm(data));
        setOpenMessageAlert(true);
        setMessageAlert(res.data.message);
        setTypeAlert("success");
      })
      .catch((error) => {
        setOpenMessageAlert(true);
        setMessageAlert(error.response?.data.message);
        setTypeAlert("warning");
      });
  };

  const registerCompanion = async (dataform) => {
    if (dataImage.imageMultUrls[props.position].includes("blob")) {
      const url = await UploadImageFile.createUrl(
        dataImage.imageMultUrls[props.position],
        dataform.cpf
      );
      dataform.avatarurl = url;
    }
    dataform.PatientId = idPatient;

    await ApiServer.post("/register-companion", dataform, {
      headers: {
        "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
      }
    })
      .then((res) => {
        dispatch(setDataCompanionForm(dataform));
        setMessageAlert(res.data.message);
        setOpenMessageAlert(true);
        setTypeAlert("success");
      })
      .catch((error) => {
        if (error.response.data.message === "Acompanhante Já existe!") {
          associateCompanionPatient(dataform);
        } else {
          console.log(error.response);
        }
      });
  };

  const handleSaveFile = (position, data) => {
    if (dataImage.imageMultUrls[position - 1] === undefined && position !== 0) {
      setMessageAlert("Favor Gravar Ficha " + position + " !");
      setOpenMessageAlert(true);
      setTypeAlert("warning");
    } else {
      dispatch(setDataCompanionForm(data));
      setMessageAlert(`Ficha ${position + 1} foi gravada!`);
      setOpenMessageAlert(true);
      setTypeAlert("success");
    }
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
        if (response.data[0]?.id) {
          dispatch(
            setImageMultUrls(
              response.data[0]?.Avatar?.url !== undefined ||
                response?.Avatar?.url !== null
                ? `${process.env.REACT_APP_BACKEND}/files/${response.data[0]?.Avatar?.url}`
                : ""
            )
          );

          const datasCompanion = {
            ...response.data[0],
            state: response.data[0].Address.state,
            status: response.data[0].Status.status,
            county: response.data[0].Address.county,
            district: response.data[0].Address.district,
            street: response.data[0].Address.street
          };

          formRef.current?.setData(datasCompanion);
          setOpenMessageAlert(true);
          setMessageAlert("Acompanhante já Cadastrado!");
          setTypeAlert("warning");
        }
      });
    }
  };

  return (
    <Box
      ref={ScrollRef}
      sx={{
        width: "90%"
      }}
    >
      <AlertMessage />
      <DialogUI position={props.position} formRef={formRef} />
      <Grid container spacing={0.8}>
        <ButtonsSaveDelete
          position={props.position}
          formRef={formRef}
          id={idPatient}
        />
        <Paper
          sx={{
            minWidth: "100%",
            height: openForm ? "100%" : HeightPaper
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
                onClick={() => {
                  setOpenForm(openForm ? false : true);
                }}
              >
                {openForm ? (
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
              idPatient === ":idPatient"
                ? handleSaveFile(props.position, data)
                : registerCompanion(data);
            }}
          >
            <Grid
              container
              sx={{
                marginTop: "2%",
                padding: "2%",
                display: openForm ? "" : "none"
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
                <CameraFileMenu type="mult" position={props.position} />
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
