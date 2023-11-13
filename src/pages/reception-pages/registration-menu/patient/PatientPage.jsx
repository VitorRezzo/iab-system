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

import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext";
import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { VAutoComplete } from "../../../../shared/components/form-unform/VAutoComplete.tsx";
import { VTextFieldMasks } from "../../../../shared/components/form-unform/VTextFieldMasks.tsx";
import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";

import Clip from "../../../../assets/img/Clip.svg";
import BackgroundPages from "../../../../assets/img/BackgroundPages.svg";

import { Form } from "@unform/web";
import { useNavigate, useParams } from "react-router-dom";
import { MenuCPUI, SubMenuCPUI } from "../style/BoxAddCompanionUI";

import { CompanionForm } from "../components/CompanionForm";
import { SideBarMenu } from "../../../../shared/components/reception-components/sidebar-menu/SideBarMenu";
import { CameraFileMenu } from "../../../../shared/components/reception-components/camera-file-menu/CameraFileMenu";
import UploadImageFile from "../../../../shared/feature/UploadImageFile";

import {
  resetImageMultUrls,
  setImageUrl
} from "../../../../shared/redux/slices/CameraFileSlice";

import {
  setAmoutForm,
  setIncremetAmoutForm,
  resetCompanionForm
} from "../../../../shared/redux/slices/CompanionFormSlice";

import { useDispatch, useSelector } from "react-redux";

export function PatientPage() {
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();
  const [patientData, setPatientData] = useState();
  const [ageP, setAgeP] = useState(0);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { idPatient } = useParams();
  const dispatch = useDispatch();
  const dataImage = useSelector((state) => state.cameraFileMenu);
  const dataForm = useSelector((state) => state.companionForm);
  useEffect(async () => {
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
          response.data?.Resident?.Avatare !== null
            ? `${process.env.REACT_APP_BACKEND}/files/${response.data.Resident.Avatare.url}`
            : ""
        )
      );

      const datasPatient = {
        ...response.data.Resident,
        ...response.data.Resident.Address,
        ...response.data.MedicalRecord,
        ...response.data.Resident.Status
      };

      formRef.current?.setData(datasPatient);
      setPatientData(response.data);
      dispatch(setIncremetAmoutForm(response.data.PatientsCompanions.length));
    }
  }, [idPatient]);

  useEffect(() => {
    return () => resetForm();
  }, []);

  const resetForm = () => {
    dispatch(resetImageMultUrls(0));
    dispatch(setImageUrl(""));
    dispatch(setAmoutForm(0));
    dispatch(resetCompanionForm(0));
  };

  const handleSave = async (data) => {
    if (idPatient === ":idPatient") {
      if (dataImage.imageUrl.includes("blob")) {
        const url = await UploadImageFile.createUrl(
          dataImage.imageUrl,
          data.cpf
        );

        data.avatarurl = url;
      }

      await ApiServer.post("/register-patients", data, {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      })
        .then(async (res) => {
          dataForm.dataCompanionForm.length > 0
            ? registerCompanion(data.cpf)
            : null;
          setMessageAlert(res.data.message);
          setOpenMessageAlert(true);
          setTypeAlert("success");
        })
        .catch((erro) => {
          console.log(erro.config);
        });
    } else {
      if (dataImage.imageUrl.includes("blob")) {
        const url = await UploadImageFile.createUrl(
          dataImage.imageUrl,
          patientData.cpf
        );

        data.avatarurl = url;
      }

      data.id = idPatient;
      data.AddressId = patientData.Resident.AddressId;
      data.MedicalRecordId = patientData.MedicalRecordId;
      data.AvatarId = patientData.Resident.AvatareId;
      data.StatusId = patientData.Resident.StatusId;
      await ApiServer.put("/update-patients", data, {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      })
        .then((res) => {
          setMessageAlert(res.data.message);
          setOpenMessageAlert(true);
          setTypeAlert("success");
        })
        .catch((error) => {
          if (error.response.data.message === "Acompanhante Já existe!") {
            setMessageAlert(res.data.message);
            setOpenMessageAlert(true);
            setTypeAlert("success");
          } else {
            console.log(error.response.data.response);
          }
        });
    }
  };

  const registerCompanion = async (cpf) => {
    const idP = await ApiServer.post(
      "/search-patient-bynameorcpf",
      { cpf: cpf },
      {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      }
    ).then((res) => {
      console.log(res.data[0].id);
      return res.data[0].id;
    });

    for (let i = 0; i < dataForm.dataCompanionForm.length; i++) {
      const url = await UploadImageFile.createUrl(
        dataImage.imageMultUrls[i],
        dataForm.dataCompanionForm[i]?.cpf
      );
      const data = {
        ...dataForm.dataCompanionForm[i],
        ...{ avatarurl: url, PatientId: idP }
      };

      await ApiServer.post("/register-companion", data, {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      })
        .then(() => {
          setTimeout(() => {
            navigate(0);
          }, 4000);
        })
        .catch((erro) => {
          console.log(erro.response);
        });
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

  const handlePositionFormCompanion = () => {
    dispatch(setIncremetAmoutForm(1));
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
              backgroundImage: `url(${BackgroundPages})`,
              backgroundColor: "#72C1F2 ",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
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
                  src={Clip}
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
                      alt="Dados do Paciente"
                      variant="h1"
                      noWrap
                      component="span"
                    >
                      Ficha do Paciente
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      alt="Codigo Paciente"
                      variant="h3"
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
                    <Typography variant="h2" noWrap component="span">
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
                    <Typography variant="h2" noWrap component="span">
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
          <MenuCPUI>
            <SubMenuCPUI>
              <Tooltip title="Adicionar Ficha">
                <IconButton
                  onClick={() => {
                    handlePositionFormCompanion();
                  }}
                  size="large"
                  color="success"
                >
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="h5" color="#FFF" noWrap component="span">
                ADICIONAR ACOMPANHANTES
              </Typography>
            </SubMenuCPUI>

            <Typography variant="h5" color="#FFF" noWrap component="span">
              Ficha(s): {dataForm.amoutForm}
            </Typography>
          </MenuCPUI>
        </Grid>

        <Grid item xs={1.5}>
          <SideBarMenu
            typePage="paciente"
            idPage=":idPatient"
            formRef={formRef}
          />
        </Grid>
      </Grid>

      {Array.from({ length: dataForm.amoutForm }).map((_, index) => (
        <CompanionForm
          key={index}
          position={index}
          datasCompanion={
            patientData?.PatientsCompanions[index]?.Companion.Resident
          }
          kinship={patientData?.PatientsCompanions[index]?.kinship}
          state={
            patientData?.PatientsCompanions[index]?.id !== undefined
              ? "save"
              : "new"
          }
        />
      ))}
    </Box>
  );
}
