import {
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { Form } from "@unform/web";
import { VAutoComplete } from "../../../../shared/components/form-unform/VAutoComplete.tsx";
import ListStatus from "../../../../constants/ListStatus.json";
import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";
import { VTimePicker } from "../../../../shared/components/form-unform/VTimePicker.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsChecked } from "../../../../shared/redux/slices/MovementPageSlice.jsx";

export function MovementForm({ type }) {
  const form = useSelector((state) => state.movementPage);

  const dispatch = useDispatch();

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

  return (
    <Grid container sx={{ padding: "2%" }} spacing={1}>
      <Paper
        sx={{
          padding: "3%",
          width: "100%",
          backgroundColor: "#1959ab"
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                variant="h2"
              >
                {type === "Exit"
                  ? "Registre uma Saida!"
                  : "Registre uma Entrada!"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <VAutoComplete
                name="procedure"
                labels="Status"
                option={ListStatus}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <VTextField name="destiny" label="Destino" variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <VTextField
                name="description"
                label="Descrição"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <VDatePick name="data" />
            </Grid>
            <Grid item xs={6}>
              <VTimePicker name="hour" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.stateMoveForm.isChecked}
                    onChange={(e) => {
                      dispatch(setIsChecked(e.target.checked));
                    }}
                  />
                }
                label="Houve despesa?"
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Grid>
  );
}
