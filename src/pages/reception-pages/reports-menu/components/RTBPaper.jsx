import { PTable } from "./PTable";
import { Paper } from "@mui/material";
import Texturapaper from "../../../../assets/img/Texturapaper.jpg";
import { BoxMark } from "../../../../shared/styles/reception-styles/StylecadP";
import { useState } from "react";
import { ETable } from "./ETable";
import { CompanionsProvider } from "../../../../shared/context/reception-sharedcomponents/list-context-report/CompanionContext";

export function RTBPaper(props) {
  const [vheight, setVHeight] = useState(null);

  const Tables = () => {
    switch (props.name) {
      case "Pacientes":
        return <PTable />;

      case "Acompanhantes":
        return (
          <CompanionsProvider>
            <ETable />
          </CompanionsProvider>
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
