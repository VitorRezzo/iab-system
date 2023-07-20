import Chart from "react-apexcharts";
import React, { useEffect, useMemo } from "react";
import { Paper } from "@mui/material";
import { FluxPatients } from "./FluxPatients";
import BackgroundPages from "../../../../assets/img/BackgroundPages.svg";
import { useMediaQuery, useTheme } from "@mui/material";
import ptbr from "../../../../constants/pt-br.json";
const BACKGROUND_PAPER = `url(${BackgroundPages})`;

export const PieCharts = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const state = useMemo(
    () => ({
      options: {
        chart: {
          type: "donut"
        },
        labels: [
          "Homens",
          "Mulheres",
          "Crianças",
          "Idosos",
          "Pacientes",
          "Acompanhantes"
        ],
        colors: [
          "#228dff",
          "#c91e5a",
          "#edc951",
          "#a86b4c",
          "#00a0b0",
          "#539fa2"
        ],

        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,

                name: {
                  show: true,
                  color: "#dfsda",
                  offsetY: -8
                },
                value: {
                  show: true,
                  fontSize: isSmallScreen ? "12px" : "16px",
                  color: undefined,
                  offsetY: 16,

                  formatter: function (val) {
                    return val;
                  }
                },
                total: {
                  show: true,
                  label: "Total",
                  fontSize: isSmallScreen ? "12px" : "20px",
                  color: "#373d3f",
                  formatter: function (w) {
                    return (
                      w.globals.seriesTotals[0] + w.globals.seriesTotals[1]
                    );
                  }
                }
              }
            }
          }
        }
      },

      series: [
        props.value?.AllMan !== undefined ? props.value.AllMan : 0,
        props.value?.AllWoman !== undefined ? props.value.AllWoman : 0,
        props.value?.AllChildren !== undefined ? props.value?.AllChildren : 0,
        props.value?.AllElderly !== undefined ? props.value.AllElderly : 0,
        props.value?.AllPatients !== undefined ? props.value.AllPatients : 0,
        props.value?.AllCompanions !== undefined ? props.value.AllCompanions : 0
      ]
    }),
    [isSmallScreen, props]
  );

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: BACKGROUND_PAPER,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Chart
        style={{
          width: "100%",
          minWidth: "280px",
          maxWidth: "450px"
        }}
        options={state.options}
        series={state.series}
        type="donut"
      />
    </Paper>
  );
};

export const LineCharts = (props) => {
  const state = {
    series: [
      {
        name: "Valor",
        data: props.value !== undefined ? props.value : [{ x: 0, y: 0 }]
      }
    ],

    chart: {
      type: "line",
      stacked: false,
      locales: [ptbr],
      defaultLocale: "pt-br"
    },

    markers: {
      size: 0
    },
    title: {
      text: "Valores Movimentados ",
      align: "left"
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + " R$";
        }
      },
      title: {
        text: "Valor"
      }
    },
    xaxis: {
      type: "datetime"
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val + " R$";
        }
      }
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",

        backgroundImage: BACKGROUND_PAPER,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Chart
        style={{ width: "100%", minWidth: "250px" }}
        options={state}
        series={state.series}
        height="260px"
        type="line"
      />
    </Paper>
  );
};

export const FluxPatiensCharts = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundImage: BACKGROUND_PAPER,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <FluxPatients />
    </Paper>
  );
};

export const ColumnCharts = (props) => {
  useEffect(() => {
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  const state = {
    series: [
      {
        data: props.value?.quant !== undefined ? props.value?.quant : [0]
      }
    ],
    chart: {
      height: 100,
      type: "bar"
    },
    colors: [
      "#" + Math.floor(Math.random() * 16777215).toString(16),
      "#" + Math.floor(Math.random() * 16777215).toString(16)
    ],
    plotOptions: {
      bar: {
        borderRadius: 4,

        horizontal: true,
        distributed: true
      }
    },
    dataLabels: {
      enabled: true
    },
    legend: {
      show: false
    },
    xaxis: {
      categories:
        props.value?.pathology !== undefined ? props.value?.pathology : [""],
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 400
        }
      }
    }
  };
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundImage: BACKGROUND_PAPER,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Chart
        style={{ width: "100%", minWidth: "250px", height: "270px" }}
        options={state}
        series={state.series}
        type="bar"
      />
    </Paper>
  );
};
