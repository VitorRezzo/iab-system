import { useEffect, useRef, useState } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";

import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";

import { ListMuni } from "../../../../constants/ListMuni";

import ListPatologia from "../../../../constants/ListPatologia.json";
import ListTipoSanguineo from "../../../../constants/ListTipoSanguineo.json";
import ListTipoVicios from "../../../../constants/ListTipoVicios.json";
import ListEscolaridade from "../../../../constants/ListEscolaridade.json";
import ListGenero from "../../../../constants/ListGenero.json";
import ListTipoRenda from "../../../../constants/ListTipoRenda.json";
import ListReligiao from "../../../../constants/ListReligiao.json";
import ListProfissao from "../../../../constants/ListProfissao.json";
import ListStatus from "../../../../constants/ListStatus.json";
import ListEstados from "../../../../constants/ListEstados.json";
import ListFormasUniao from "../../../../constants/ListFormasUniao.json";
import ListStatusCivil from "../../../../constants/ListStatusCivil.json";

import AddBoxIcon from "@mui/icons-material/AddBox";
import { FcRules } from "react-icons/fc";

import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext";
import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { VAutoComplete } from "../../../../shared/components/form-unform/VAutoComplete.tsx";
import { VTextFieldMasks } from "../../../../shared/components/form-unform/VTextFieldMasks.tsx";
import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";

import GrampoICO from "../../../../assets/img/GrampoICO.png";
import TexturaPran from "../../../../assets/img/TexturaPran.jpg";

import { Form } from "@unform/web";
import { useNavigate, useParams } from "react-router-dom";
import {
  MenuAddCompanion,
  TitleMenuAcom,
  SubTitleMenuAcom,
  SubMenuCompanion
} from "../../../../shared/styles/reception-styles/StylecadP.jsx";

import { CompanionForm } from "../components/CompanionForm";
import { SideBarMenu } from "../../../../shared/components/reception-components/sidebar-menu/SideBarMenu";
import { CameraFileMenu } from "../../../../shared/components/reception-components/camera-file-menu/CameraFileMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  setImageMultUrls,
  setImageUrl
} from "../../../../shared/redux/slices/camera-file-slice/CameraFileSlice";
import {
  setAmoutForm,
  setIncremetAmoutForm
} from "../../../../shared/redux/slices/camera-file-slice/CompanionFormSlice";
import URLToFile from "../../../../shared/features/URLToFile";

export function PatientPage() {
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();
  const [patientData, setPatientData] = useState();
  const [companionFormStatus, setCompanionFormStatus] = useState();
  const [ageP, setAgeP] = useState(0);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { idPatient } = useParams();
  const dispatch = useDispatch();
  const dataImage = useSelector((state) => state.cameraFileMenu);
  const dataForm = useSelector((state) => state.companionForm);
  useEffect(async () => {
    resetForm();
    if (idPatient !== ":idPatient") {
      const response = await ApiServer.post(
        `/get-patients-byid/${idPatient}`,
        null,
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        return response;
      });

      dispatch(
        setImageUrl(
          response.data.Avatar !== null
            ? "/files/" + response.data.Avatar.url
            : ""
        )
      );

      const datasPatient = {
        ...response.data,
        ...response.data.Address,
        ...response.data.MedicalRecord,
        ...response.data.Status
      };

      formRef.current?.setData(datasPatient);
      setPatientData(response.data);
      dispatch(setIncremetAmoutForm(response.data.Companions.length));
    }
  }, [idPatient]);

  const resetForm = () => {
    dispatch(setImageUrl(""));
    dispatch(setImageMultUrls([]));
    dispatch(setAmoutForm(0));
  };

  const handleSave = async (data) => {
    const imageFilename = URLToFile.convertUrlToFile(dataImage.imageUrl);
    if (idPatient === ":idPatient") {
      if (imageFilename !== undefined) {
        const url = await ApiServer.post(
          `/upload-avatar/${data.cpf}`,
          imageFilename
        ).then((response) => {
          return response.data;
        });

        data.avatarurl = url;
      }
      await ApiServer.post("/register-patients", data, {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      })
        .then(async (res) => {
          registerCompanion(data.cpf);
          setMessageAlert(res.data.message);
          setOpenMessageAlert(true);
          setTypeAlert("success");
          setTimeout(() => {
            navigate(0);
          }, 4000);
        })
        .catch((erro) => {
          console.log(erro);
        });
    } else {
      if (imageFilename !== undefined) {
        const url = await ApiServer.post(
          `/upload-avatar/${patientData.cpf}`,
          imageFilename
        ).then((response) => {
          return response.data;
        });

        data.avatarurl = url;
      }

      data.id = patientData.id;
      data.AddressId = patientData.AddressId;
      data.MedicalRecordId = patientData.MedicalRecordId;
      data.AvatarId = patientData.AvatarId;
      data.StatusId = patientData.StatusId;
      await ApiServer.put("/update-patients", data, {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      })
        .then(async (res) => {
          setMessageAlert(res.data.message);
          setOpenMessageAlert(true);
          setTypeAlert("success");
        })
        .catch((erro) => {
          console.log(erro);
        });
    }
  };

  const registerCompanion = async (cpf) => {
    if (dataForm.dataCompanionForm !== undefined) {
      const idPatient = await ApiServer.post(
        "/search-patient-bynameorcpf",
        { cpf: cpf },
        {
          headers: {
            "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
          }
        }
      ).then((res) => {
        return res.data[0].id;
      });

      for (var i = 0; i <= dataForm.dataCompanionForm.length; i++) {
        const imageFilename = URLToFile.convertUrlToFile(
          dataImage.imageMultUrls[i]
        );
        const url = await ApiServer.post(
          `/upload-avatar/${dataForm.dataCompanionForm[i].cpf}`,
          imageFilename
        ).then((response) => {
          return response.data;
        });
        dataForm.dataCompanionForm[i].PatientId = idPatient;
        dataForm.dataCompanionForm[i].avatarurl = url;
        await ApiServer.post(
          "/register-companion",
          dataForm.dataCompanionForm[i],
          {
            headers: {
              "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
            }
          }
        )
          .then(async (res) => {
            console.log(res);
          })
          .catch((erro) => {
            console.log(erro);
          });
      }
    }
  };

  const handleChangeAge = (newDate) => {
    const d = new Date();
    if (newDate !== null) {
      const age = Math.floor(
        Math.ceil(
          Math.abs(newDate.getTime() - d.getTime()) / (1000 * 3600 * 24)
        ) / 365.25
      );
      if (age < 1000) {
        setAgeP(age < 10 ? "0" + age : age);
      }
    }
  };

  const searchPatient = async (cpf) => {
    if (idPatient === ":idPatient" && cpf.length === 14) {
      await ApiServer.post(
        "/search-patient-bynameorcpf",
        {
          cpf: cpf
        },
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        if (response.data[0]?.id) {
          navigate(`/cadastro/paciente/${response.data[0]?.id}`);
          setMessageAlert("Paciente já Cadastrado!");
          setOpenMessageAlert(true);
          setTypeAlert("warning");
        }
      });
    }
  };

  return (
    <Box sx={{ padding: "2%", marginTop: "3%" }}>
      <AlertMessage />
      <Grid container spacing={1.5}>
        <Grid item xs={10.5}>
          <Paper
            sx={{
              padding: "5%",
              borderRadius: "1%",
              backgroundImage: `url(${TexturaPran})`,
              backgroundColor: "#72C1F2 "
            }}
            elevation={24}
          >
            <Grid container>
              <Grid item xs={5} />
              <Grid item xs={3}>
                <img
                  style={{
                    position: "absolute",
                    marginTop: "-8.5%",
                    width: "125px",
                    height: "135px"
                  }}
                  src={GrampoICO}
                />
              </Grid>
              <Grid item xs={4} />
            </Grid>
            <Paper
              sx={{
                background: "#FFF",
                marginTop: "-5%",
                height: "1100px"
              }}
              elevation={4}
            >
              <Form ref={formRef} onSubmit={(data) => handleSave(data)}>
                <Grid
                  container
                  sx={{ marginTop: "2%", padding: "2%" }}
                  spacing={2}
                >
                  <Grid item xs={10}>
                    <Typography
                      sx={{ color: "#085A8C" }}
                      alt="Dados do Paciente"
                      variant="h4"
                      noWrap
                      component="span"
                    >
                      Ficha do Paciente
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      sx={{ color: "#085A8C" }}
                      alt="Codigo Paciente"
                      variant="h6"
                      noWrap
                      component="span"
                    >
                      CDP - 0000
                    </Typography>
                  </Grid>
                  <Grid item xs={4} />

                  <Grid item xs={4}>
                    <CameraFileMenu />
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
                        searchPatient(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2.2}>
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
                  <Grid item xs={2}>
                    <VAutoComplete
                      name="status"
                      labels="Status"
                      option={ListStatus}
                    />
                  </Grid>
                  <Grid item xs={1.7}>
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
                      option={ListEstados}
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
                      Dados Complementares
                    </Typography>
                  </Grid>

                  <Grid item xs={3.5}>
                    <VAutoComplete
                      name="pathology"
                      labels="Patologia"
                      option={ListPatologia}
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
                    <VTextField name="clinicalstate" label="Estado Clínico" />
                  </Grid>
                  <Grid item xs={3}>
                    <VTextField
                      name="biopsyresult"
                      label="Resultado da Biopsia"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <VTextField
                      name="directedhospital"
                      label="Hospital Direcionado"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <VTextField name="medicalname" label="Nome do Médico" />
                  </Grid>
                  <Grid item xs={4}>
                    <VTextField
                      name="socialworker"
                      label="Assistente Social Resposável"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <VTextField
                      name="treatmenttype"
                      label="Tipo de Tratamento"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <VTextFieldMasks
                      name="medicalphone"
                      labeltext="Telefone do Médico ou Hospital"
                    />
                  </Grid>
                </Grid>
              </Form>
            </Paper>
          </Paper>
          <MenuAddCompanion>
            <TitleMenuAcom>
              <FcRules size={25} />
              FICHAS DOS ACOMPANHANTES
            </TitleMenuAcom>
            <SubMenuCompanion>
              <Tooltip title="Adcionar Ficha">
                <IconButton
                  onClick={() => {
                    setCompanionFormStatus("new");
                    dispatch(setIncremetAmoutForm(1));
                  }}
                  sx={{ marginTop: "10%" }}
                  size="large"
                  color="success"
                >
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
              <Box
                sx={{
                  dysplay: "flex",
                  flexDirection: "row",
                  marginTop: "20%"
                }}
              >
                <SubTitleMenuAcom>
                  Ficha(s): {dataForm.amoutForm}
                </SubTitleMenuAcom>
              </Box>
            </SubMenuCompanion>
          </MenuAddCompanion>
        </Grid>

        <Grid item xs={1.5}>
          <SideBarMenu typePage=":idPatient" formRef={formRef} />
        </Grid>
      </Grid>

      {Array.from({ length: dataForm.amoutForm }).map((_, index) => (
        <CompanionForm
          key={index}
          position={index}
          stateForm={companionFormStatus}
        />
      ))}
    </Box>
  );
}
