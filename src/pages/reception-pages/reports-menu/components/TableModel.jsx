import { TablePatient } from "./TablePatient";
import { Paper, Typography } from "@mui/material";
import PaperTexture from "../../../../assets/img/PaperTexture.svg";
import { BoxMark } from "../../../../shared/styles/reception-styles/StylecadP";
import { useState } from "react";
import { TableCampanion } from "./TableCampanion";
import { store } from "../../../../shared/redux/store/store";
import { Provider } from "react-redux";
export function TableModel(props) {
  const [vheight, setVHeight] = useState(null);

  const Tables = () => {
    switch (props.name) {
      case "Pacientes":
        return (
          <Provider store={store}>
            <TablePatient />
          </Provider>
        );

      case "Acompanhantes":
        return (
          <Provider store={store}>
            <TableCampanion />
          </Provider>
        );
    }
  };

  return (
    <>
      <BoxMark
        background={props.color}
        onClick={() => {
          vheight === null ? setVHeight("100%") : setVHeight(null);
        }}
      >
        <Typography variant="h4">{props.name}</Typography>
      </BoxMark>
      <Paper
        sx={{
          marginTop: "-1%",
          backgroundImage: `url(${PaperTexture})`,
          height: vheight === null ? "125px" : "100%",
          padding: "2%",
          marginBottom: vheight === null ? "0" : "5%"
        }}
      >
        {vheight !== null ? <Tables /> : null}
      </Paper>
    </>
  );
}
