import { useEffect, useRef, useState } from "react";
import { Grid, Box, Paper, Typography, Divider } from "@mui/material";

import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";

import { ListMuni } from "../../../../constants/ListMuni";

import ListTipoVicios from "../../../../constants/ListTipoVicios.json";
import ListEscolaridade from "../../../../constants/ListEscolaridade.json";
import ListGenero from "../../../../constants/ListGenero.json";
import ListTipoRenda from "../../../../constants/ListTipoRenda.json";
import ListReligiao from "../../../../constants/ListReligiao.json";
import ListProfissao from "../../../../constants/ListProfissao.json";
import ListStatus from "../../../../constants/ListStatus.json";
import ListFormasUniao from "../../../../constants/ListFormasUniao.json";
import ListStatusCivil from "../../../../constants/ListStatusCivil.json";

import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { VAutoComplete } from "../../../../shared/components/form-unform/VAutoComplete.tsx";
import { VTextFieldMasks } from "../../../../shared/components/form-unform/VTextFieldMasks.tsx";
import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";

import { Form } from "@unform/web";
import { useParams } from "react-router-dom";

import { useAlertMessageContext } from "../../../../shared/context/AlertMessageContext";
import { SideBarMenu } from "../../../../shared/components/reception-components/sidebar-menu/SideBarMenu";
import { CameraFileMenu } from "../../../../shared/components/reception-components/camera-file-menu/CameraFileMenu";
import { useDispatch, useSelector } from "react-redux";
import { setImageUrl } from "../../../../shared/redux/slices/camera-file-slice/CameraFileSlice";
import UploadImageFile from "../../../../shared/feature/UploadImageFile";
export function CompanionPage() {
  const { AlertMessage, setMessageAlert, setOpenMessageAlert, setTypeAlert } =
    useAlertMessageContext();
  const [datacompanion, setDataCompanion] = useState();
  const { idCompanion } = useParams();
  const dataImage = useSelector((state) => state.cameraFileMenu);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [ageP, setAgeP] = useState(0);
  useEffect(async () => {
    if (idCompanion !== ":idCompanion") {
      const response = await ApiServer.post(
        `/get-companions-byid/${idCompanion}`,
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
            ? `${process.env.REACT_APP_BACKEND}/files/${response.data.Avatar.url}`
            : ""
        )
      );

      const newObj = {
        ...response.data,
        ...response.data.Status,
        ...response.data.Address
      };
      setDataCompanion(newObj);
      formRef.current?.setData(newObj);
    }
  }, [idCompanion]);

  const handleSave = async (data) => {
    if (dataImage.imageUrl !== undefined) {
      UploadImageFile.createUrl(data, dataImage.imageUrl, datacompanion.cpf);
    }

    data.AvatarId = datacompanion.AvatarId;
    data.id = idCompanion;
    data.StatusId = datacompanion.StatusId;
    data.AddressId = datacompanion.AddressId;
    await ApiServer.put("/update-companion", data, {
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
        setAgeP(age);
      }
    }
  };

  return (
    <Box sx={{ padding: "2%" }}>
      <AlertMessage />
      <Grid container spacing={0.8}>
        <Grid item xs={10.5}>
          <Paper sx={{ height: "100%" }} elevation={5}>
            <Form ref={formRef} onSubmit={(data) => handleSave(data)}>
              <Grid container sx={{ padding: "2%" }} spacing={2}>
                <Grid item xs={10}>
                  <Typography
                    alt="Dados do Acompanhante"
                    variant="h1"
                    noWrap
                    component="span"
                  >
                    Ficha do Acompanhante
                  </Typography>
                </Grid>
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
                  <VTextFieldMasks name="cpf" labeltext="CPF" />
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
                  <VTextField name="state" label="Estado" />
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
        <Grid item xs={1.5}>
          <SideBarMenu typePage=":idCompanion" formRef={formRef} />
        </Grid>
      </Grid>
    </Box>
  );
}
