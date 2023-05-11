import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Chart from "react-apexcharts";
import jsPDF from "jspdf";

export const TypeCharts = (props) => {
  const doc = new jsPDF("l", "px", "a4");

  const DefaultChart = () => {
    const colors = ["#005c81", "#77f2de", "#e79a32", "#fc6e3d"];

    const state = {
      series: [
        {
          data: ["21", "22", "50", "8"]
        }
      ],
      chart: {
        height: 200,
        id: "chart",
        type: "bar",
        fontSize: "20px"
      },
      colors,
      plotOptions: {
        bar: {
          columnWidth: "30%",

          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ["Pacientes"],
          ["Acompanhantes"],
          ["Despesas"],
          ["Movimentos"]
        ],
        labels: {
          style: {
            colors,
            fontSize: "20px",
            fontWeight: 700
          }
        }
      }
    };

    return (
      <Box>
        <Chart
          options={state}
          series={state.series}
          width="100%"
          height="420px"
          type="bar"
        />
      </Box>
    );
  };

  const BarChart = () => {
    const colors = ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"];

    const state = {
      series: [
        {
          data: props.value.amount
        }
      ],
      chart: {
        height: 200,
        id: "chart",
        type: "bar",
        fontSize: "2px"
      },

      plotOptions: {
        bar: {
          barHeight: "70%",
          distributed: true,
          horizontal: false,
          dataLabels: {
            position: "center"
          }
        }
      },
      colors,
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#1c3166"]
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: props.value.model,
        labels: {
          style: {
            colors,
            fontSize: "2px",
            fontWeight: 600
          }
        }
      }
    };
    const PrintDocs = async () => {
      await ApexCharts.exec("chart", "dataURI").then(({ imgURI }) => {
        doc.text(250, 30, "Tabela Graficos");
        doc.addImage(imgURI, "png", 55, 50, 500, 200);
        window.open(doc.output("bloburl"));
      });
    };
    return (
      <Box>
        <Chart
          options={state}
          series={state.series}
          width="100%"
          height="380"
          type="bar"
        />
        <Button
          onClick={() => {
            PrintDocs();
          }}
        >
          PDF
        </Button>
      </Box>
    );
  };

  const TypeCharts = () => {
    switch (props.type) {
      case "Paciente Por Municipio":
        return <BarChart />;
      case "Paciente Por Patologia":
        return <BarChart />;
      case "Paciente Por Gênero":
        return <BarChart />;
      case "Acompanhantes Por Municipio":
        return <BarChart />;
      case "Acompanhantes Por Gênero":
        return <BarChart />;
      case "Moradores Por Municipio":
        return <BarChart />;
      case "Moradores Por Gênero":
        return <BarChart />;
      case "Óbitos Por Gênero":
        return <BarChart />;
      case "Óbitos Por Municipio":
        return <BarChart />;
      default:
        return <DefaultChart />;
    }
  };

  return (
    <Box>
      <Paper elevation={5} sx={{ marginTop: "2%" }}>
        <TypeCharts />
      </Paper>
    </Box>
  );
};
