import Chart from "react-apexcharts";
import React, { useEffect } from "react";
import { Avatar, Paper } from "@mui/material";
import { FluxPatients } from "./FluxPatients";
import TexturaPran from "../../../../assets/img/TexturaPran.jpg";
//import { io } from "socket.io-client";
import ptbr from "../../../../constants/pt-br.json";
const BACKGROUND_PAPER = `url(${TexturaPran})`;

export const PieCharts = (props) => {
  const state = {
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
                fontSize: "22px",
                fontFamily: "Rubik",
                color: "#dfsda",
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: "Helvetica, Arial, sans-serif",
                color: undefined,
                offsetY: 16,

                formatter: function (val) {
                  return val;
                }
              },
              total: {
                show: true,
                label: "Total",
                color: "#373d3f",
                formatter: function (w) {
                  return w.globals.seriesTotals[0] + w.globals.seriesTotals[1];
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
  };

  return (
    <Paper
      sx={{
        backgroundImage: BACKGROUND_PAPER,
        width: "100%",
        paddingTop: "2%",
        height: "270px"
      }}
    >
      <Chart
        options={state.options}
        series={state.series}
        width="100%"
        height="100%"
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
      defaultLocale: "pt-br",
      height: 200
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
      sx={{ backgroundImage: BACKGROUND_PAPER, width: "100%", height: "280px" }}
    >
      <Chart
        options={state}
        series={state.series}
        width="100%"
        height="100%"
        type="line"
      />
    </Paper>
  );
};

export const ProgressCharts = (props) => {
  const state = {
    series: props.value?.AllResidents
      ? [Math.round(props.value?.AllResidents)]
      : [0],
    chart: {
      height: 400,
      type: "radialBar",
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "50%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px"
          },
          value: {
            formatter: function (val) {
              return val + "%";
            },
            color: "#111",
            fontSize: "36px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 200]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Taxa de Ocupação"]
  };

  return (
    <Paper
      sx={{ backgroundImage: BACKGROUND_PAPER, width: "100%", height: "680px" }}
    >
      <Chart options={state} series={state.series} type="radialBar" />
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

  const colors = [
    "#228dff",
    "#a86b4c",
    "#09738a",
    "#c91e5a",
    "#98173d",
    "#351330",
    "#00b34c",
    "#1c0b2b",
    "#314c53",
    "#25857d",
    "#8f9e6f",
    "#f67280",
    "#99b2b7",
    "#a8a39d"
  ];

  const state = {
    series: [
      {
        data: props.value?.quant !== undefined ? props.value?.quant : [0]
      }
    ],
    chart: {
      height: 200,
      type: "bar"
    },
    colors,
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "15%",
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
          colors,
          fontSize: "12px",
          fontWeight: 600
        }
      }
    }
  };
  return (
    <Paper
      sx={{
        backgroundImage: BACKGROUND_PAPER,
        width: "100%",
        height: "390px"
      }}
    >
      <Chart
        options={state}
        series={state.series}
        width="100%"
        height="100%"
        type="bar"
      />
    </Paper>
  );
};
