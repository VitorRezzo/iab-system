import jsPDF from "jspdf";
import React from "react";
import { Avatar, Button, Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { renderToString } from "react-dom/server";
import LogoIAB from "../../../../assets/img/LogoIAB.png";
import moment from "moment";
export function PPDFReports() {
  const doc = new jsPDF("p", "px", "a4");

  const PatientPrint = () =>
    patientsList.map((row, index) => (
      <Box
        key={index}
        sx={{
          padding: "5%",
          width: "445px",
          height: "630px"
        }}
      >
        <img
          src={LogoIAB}
          style={{
            width: "100px",
            height: "45px",
            marginLeft: "4%",
            marginTop: "4%"
          }}
        />

        <Typography
          sx={{
            marginLeft: "36%",
            fontSize: "17px",
            color: "#0a6789",
            marginTop: "-10%"
          }}
          component="div"
        >
          Ficha Cadastro
        </Typography>
        <Typography
          sx={{
            marginLeft: "37.5%",
            fontSize: "27px",
            color: "#0a6789",
            marginTop: "-3%"
          }}
          component="div"
        >
          Paciente
        </Typography>
        <Typography
          sx={{ marginLeft: "76%", fontSize: "5.5px", marginTop: "-5%" }}
          component="div"
        >
          Instituto Antonio Brunno, <br />
          Casa de Apoio às Pessoas com Câncer , <br />
          São Luís - MA (98) 31810016.
        </Typography>
        <Divider sx={{ marginTop: "2%", border: "1px solid #26ade4" }} />
        <Avatar
          src={"/files/" + row.Avatar?.url}
          sx={{
            width: "80px",
            height: "80px",
            marginTop: "2%",
            marginLeft: "75%"
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "-18%",
            marginLeft: "2%"
          }}
        >
          <TypographyUI
            component="label"
            sx={{ fontSize: "17px", color: "#040004" }}
          >
            {row.fullname},{row.age} anos
          </TypographyUI>
          <TypographyUI
            component="label"
            sx={{ fontSize: "14px", color: "#040004" }}
          >
            {row.MedicalRecord.pathology}.
          </TypographyUI>
          <TypographyUI
            component="label"
            sx={{
              fontSize: "12px",
              marginLeft: "15%",
              padding: "1%",
              background:
                row.Status.status === "Na Casa" ? "#a2fa1b" : "#fe6c2b",
              borderRadius: "5px",
              width: "50px"
            }}
          >
            {row.Status.status}
          </TypographyUI>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "2%" }}
          >
            <Box
              sx={{
                marginTop: "2%",
                marginLeft: "-2.2%",
                background: "#26ade4",
                height: "20px",
                marginBottom: "1%"
              }}
            >
              <TypographyUI
                component="label"
                sx={{ marginLeft: "34%", color: "#FFFF", fontSize: "12px" }}
              >
                <strong>DADOS PESSOAIS</strong>
              </TypographyUI>
            </Box>
            <BoxUI>
              <TypographyUI component="label">
                <strong>CPF: </strong> {row.cpf}
              </TypographyUI>
              <TypographyUI component="label">
                <strong>GENERO: </strong> {row.gender}
              </TypographyUI>
              <TypographyUI component="label">
                <strong>DATA DE NASCIMENTO: </strong>
                {moment(row.birthdate).format("DD/MM/YYYY")}
              </TypographyUI>
            </BoxUI>
            <BoxUI>
              <TypographyUI component="label">
                <strong>GRAU DE INSTRUÇÃO: </strong> {row.schooling}
              </TypographyUI>
              <TypographyUI component="label">
                <strong>PROFISSÃO: </strong> {row.profession}
              </TypographyUI>
              <TypographyUI component="label">
                <strong>RENDA: </strong> {row.wage}
              </TypographyUI>
            </BoxUI>
            <BoxUI>
              <TypographyUI component="label">
                <strong>RELIGIÃO: </strong>
                {row.religion}
              </TypographyUI>
              <TypographyUI component="label">
                <strong>VICIOS: </strong> {row.addiction}
              </TypographyUI>
              <TypographyUI component="label">
                <strong>CONTATO: </strong>
                {row.contact}
              </TypographyUI>
            </BoxUI>
            <Box
              sx={{
                marginTop: "2%",
                marginLeft: "-2.2%",
                background: "#26ade4",
                height: "20px",
                marginBottom: "1%"
              }}
            >
              <TypographyUI
                component="label"
                sx={{ marginLeft: "38%", color: "#FFFF", fontSize: "12px" }}
              >
                <strong>ENDEREÇO</strong>
              </TypographyUI>
            </Box>
            <BoxUI>
              <TypographyUI component="label" sx={{ marginLeft: "20%" }}>
                <strong>ESTADO: </strong>
                {row.Address.state}
              </TypographyUI>
              <TypographyUI component="label" sx={{ marginLeft: "6%" }}>
                <strong>MUNICIPIO: </strong>
                {row.Address.county}
              </TypographyUI>
            </BoxUI>
            <BoxUI>
              <TypographyUI component="label" sx={{ marginLeft: "20%" }}>
                <strong>BAIRRO: </strong>
                {row.Address.district}
              </TypographyUI>
              <TypographyUI component="label" sx={{ marginLeft: "5%" }}>
                <strong>RUA: </strong>
                {row.Address.street}
              </TypographyUI>
            </BoxUI>
            <Box
              sx={{
                marginTop: "2%",
                marginLeft: "-2.2%",
                background: "#26ade4",
                height: "20px",
                marginBottom: "1%"
              }}
            >
              <TypographyUI
                component="label"
                sx={{ marginLeft: "34%", color: "#FFFF", fontSize: "12px" }}
              >
                <strong>DADOS MEDICOS</strong>
              </TypographyUI>
            </Box>
            <BoxUI>
              <TypographyUI component="label" sx={{ marginLeft: "5%" }}>
                <strong>ESTADO CLINICO: </strong>
                {row.MedicalRecord.clinicalstate}
              </TypographyUI>
              <TypographyUI component="label" sx={{ marginLeft: "8%" }}>
                <strong>TRATAMENTO: </strong>
                {row.MedicalRecord.treatmenttype}
              </TypographyUI>
            </BoxUI>
            <BoxUI>
              <TypographyUI component="label" sx={{ marginLeft: "5%" }}>
                <strong>RESULTADO DA BIOPSIA: </strong>
                {row.MedicalRecord.biopsyresult}
              </TypographyUI>
              <TypographyUI component="label" sx={{ marginLeft: "8%" }}>
                <strong>TIPO SANGUINEO: </strong>
                {row.bloodtype}
              </TypographyUI>
            </BoxUI>
            <BoxUI>
              <TypographyUI component="label" sx={{ marginLeft: "5%" }}>
                <strong>HOSPITAL DIRECIONADO: </strong>
                {row.MedicalRecord.directedhospital}
              </TypographyUI>
              <TypographyUI component="label" sx={{ marginLeft: "2%" }}>
                <strong>TELEFONE DO MEDICO OU HOSPITAL: </strong>
                {row.MedicalRecord.medicalphone}
              </TypographyUI>
            </BoxUI>
            <BoxUI>
              <TypographyUI component="label" sx={{ marginLeft: "5%" }}>
                <strong>NOME DO MEDICO: </strong>
                {row.MedicalRecord.medicalname}
              </TypographyUI>
              <TypographyUI component="label" sx={{ marginLeft: "9%" }}>
                <strong>ASSISTENTE SOCIAL: </strong>
                {row.MedicalRecord.socialworker}
              </TypographyUI>
            </BoxUI>
            <Box
              sx={{
                marginTop: "2%",
                marginLeft: "-2.2%",
                background: "#26ade4",
                height: "20px",
                marginBottom: "1%"
              }}
            >
              <TypographyUI
                component="label"
                sx={{ marginLeft: "34%", color: "#FFFF", fontSize: "12px" }}
              >
                <strong>ACOMPANHANTES</strong>
              </TypographyUI>
            </Box>
            {row.Companions.map((value, index) => (
              <BoxUI key={index}>
                <Avatar
                  src={value.Avatar?.url ? "/files/" + value.Avatar?.url : ""}
                  sx={{
                    width: "20px",
                    height: "20px"
                  }}
                />
                <TypographyUI component="label" sx={{ marginLeft: "2%" }}>
                  <strong>NOME: </strong>
                  {value.fullname}
                </TypographyUI>
                <TypographyUI component="label" sx={{ marginLeft: "2%" }}>
                  <strong>GRAU DE PARENTESCO: </strong>
                  {value.kinship}
                </TypographyUI>
                <TypographyUI component="label" sx={{ marginLeft: "2%" }}>
                  <strong>CONTATO: </strong>
                  {value.contact}
                </TypographyUI>
              </BoxUI>
            ))}
          </Box>
        </Box>
      </Box>
    ));

  const PatientDocs = () => {
    const report = renderToString(<PatientPrint />);
    doc.html(report, {
      callback: function (doc) {
        window.open(doc.output("bloburl"));
      },

      x: 1,
      y: 1
    });
  };

  return (
    <React.Fragment>
      <ButtonUI
        startIcon={<PictureAsPdfIcon />}
        onClick={() => {
          PatientDocs();
        }}
      >
        Gerar
      </ButtonUI>
    </React.Fragment>
  );
}

const ButtonUI = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A71F21"),
  height: "40px",
  width: "140px",
  marginRight: "2%",
  backgroundColor: "#A71F21",
  "&:hover": {
    backgroundColor: "#A71F21"
  }
}));

const TypographyUI = styled(Typography)(() => ({
  fontSize: "8px",
  color: "#040004",
  marginTop: "1%",
  marginLeft: "2%"
}));

const BoxUI = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  border: "1px solid #aab3ab",
  marginTop: "1%",
  borderRadius: "4px",
  width: "420px"
}));
