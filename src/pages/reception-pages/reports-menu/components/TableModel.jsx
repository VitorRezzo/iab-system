import { TablePatient } from "./TablePatient";
import { Paper } from "@mui/material";
import Texturapaper from "../../../../assets/img/Texturapaper.jpg";
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
        {props.name}
      </BoxMark>
      <Paper
        sx={{
          marginTop: "-1%",
          backgroundImage: `url(${Texturapaper})`,
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
