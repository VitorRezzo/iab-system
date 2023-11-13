import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Avatar,
  InputAdornment,
  Fade
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { MovementForm } from "./MovementForm";
import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { Form } from "@unform/web";
import { ExpenseForm } from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setStateMoveForm,
  setResidentData
} from "../../../../shared/redux/slices/MovementPageSlice";
import useDebounce from "../../../../shared/hooks/useDebounce";
import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";

export function ResidentForm() {
  const isResult = useSelector((state) => state.movementPage);

  const dispatch = useDispatch();

  const searchResidentByNameorCpf = async (targetValue) => {
    await ApiServer.post(
      "/search-resident-bynameorcpf",
      {
        fullname: targetValue,
        cpf: targetValue
      },
      {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      }
    ).then((response) => {
      dispatch(
        setResidentData(
          response.data.Resident !== null ? response.data.Resident : ""
        )
      );
      dispatch(
        setStateMoveForm({
          open: response.data.Resident !== null ? true : false
        })
      );
    });
  };
  const debouncedsearchResidentByNameorCpf = useDebounce(
    searchResidentByNameorCpf,
    500
  );
  return (
    <Grid container sx={{ paddingTop: "2%" }} spacing={2}>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        xs={isResult.stateMoveForm.open ? 3 : 12}
      >
        <Paper
          elevation={5}
          sx={{
            padding: "2%",
            height: "300px",
            maxWidth: "280px",
            backgroundColor: "#fed734"
          }}
        >
          <Grid container spacing={3}>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "center" }}
              xs={12}
            >
              <Avatar
                src={
                  isResult?.residentData?.Avatare?.url
                    ? `${process.env.REACT_APP_BACKEND}/files/${isResult.residentData.Avatare.url}`
                    : ""
                }
                sx={{
                  "& .MuiAvatar-img": {
                    padding: "15%"
                  },
                  width: "90px",
                  height: "90px"
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Form>
                <VTextField
                  name="name"
                  placeholder="Pesquise o nome ou cpf"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonSearchIcon />
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) =>
                    debouncedsearchResidentByNameorCpf(e.target.value)
                  }
                  variant="filled"
                />

                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15%",
                    color: "#3b3b3b",
                    borderRadius: "5px",
                    padding: "2% 5%",
                    backgroundColor:
                      isResult?.residentData?.Status?.status == "Internado" ||
                      isResult?.residentData?.Status?.status == "Óbito"
                        ? "#fa3e3e"
                        : isResult?.residentData?.Status?.status == "Viagem"
                        ? "#f3c75f"
                        : isResult?.residentData?.Status?.status == "Curado"
                        ? "#80b3ff"
                        : isResult?.residentData?.Status?.status == "Na Casa"
                        ? "#a2fa1b"
                        : "#ededed"
                  }}
                  variant="h4"
                >
                  {isResult?.residentData?.Status?.status
                    ? isResult.residentData.Status.status
                    : "Status"}
                </Typography>
              </Form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {isResult.stateMoveForm.open ? (
        <Fade in={true} timeout={1000}>
          <Grid item xs={9}>
            <Grid container spacing={1}>
              <Grid item xs={1.5}>
                {isResult?.residentData?.Status?.status === "Na Casa" ? (
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "150px",
                      color: "#FFF",
                      background: "#b0254f",
                      padding: "5%",
                      borderRadius: "5px"
                    }}
                    variant="h4"
                  >
                    Saida <KeyboardDoubleArrowRightIcon fontSize="medium" />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "150px",
                      color: "#FFF",
                      background: "#1d8d08",
                      padding: "5%",
                      borderRadius: "5px"
                    }}
                    variant="h4"
                  >
                    <KeyboardDoubleArrowLeftIcon fontSize="medium" /> Entrada
                  </Typography>
                )}
              </Grid>

              <Grid item xs={5.5}>
                <MovementForm
                  type={
                    isResult?.residentData?.Status?.status === "Na Casa"
                      ? "Exit"
                      : "Enter"
                  }
                />
              </Grid>
              {isResult.isChecked ? (
                <Grid item xs={4.5}>
                  <ExpenseForm />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Fade>
      ) : null}
    </Grid>
  );
}
