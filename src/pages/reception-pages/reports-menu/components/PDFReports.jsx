import jsPDF from "jspdf";
import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { renderToString } from "react-dom/server";
import { PrintDocs } from "./PrintDocs";
import { Provider } from "react-redux";
import { store } from "../../../../shared/redux/store/store";
export function PDFReports(props) {
  const doc = new jsPDF("p", "px", "a4");

  const MyDocs = () => {
    const report = renderToString(
      <Provider store={store}>
        <PrintDocs type={props.type} />
      </Provider>
    );
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
          MyDocs();
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
