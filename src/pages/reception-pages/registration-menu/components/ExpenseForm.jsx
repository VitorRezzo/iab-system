import { Grid, Paper, Typography, Fade } from "@mui/material";
import { VTextField } from "../../../../shared/components/form-unform/VTextField.tsx";
import { Form } from "@unform/web";

export function ExpenseForm() {
  return (
    <Grid container sx={{ padding: "2%" }} spacing={1}>
      <Fade in={true} timeout={1000}>
        <Paper
          sx={{
            padding: "5%",
            width: "100%",
            height: "425px"
          }}
          component="div"
        >
          <Form>
            <Grid container spacing={1.8}>
              <Grid item xs={12}>
                <Typography
                  sx={{ display: "flex", justifyContent: "center" }}
                  variant="h2"
                >
                  Registre uma Despesa!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <VTextField
                    name="subject"
                    label="Motivo"
                    variant="outlined"
                  />
                </Grid>
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

              <Grid item xs={12}>
                <VTextField
                  name="typepayment"
                  label="Tipo de Pagamento"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <VTextField name="price" label="Valor" variant="outlined" />
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </Fade>
    </Grid>
  );
}
