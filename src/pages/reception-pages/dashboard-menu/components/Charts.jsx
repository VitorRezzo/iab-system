import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { FluxPatients } from "./FluxPatients";
import { useMediaQuery, useTheme, Typography } from "@mui/material";
import ptbr from "../../../../constants/pt-br.json";
import { BoxChart } from "./BoxChart";
import { BoxChartMin } from "./BoxChart";
import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import moment from "moment";

export const PieCharts = () => {
  const [pieResidents, setPieResidents] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(async () => {
    await ApiServer.get("/count-allresidents-bygender", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setPieResidents(response.data);
    });
  }, []);

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
                color: "#dfsda",
                offsetY: -8
              },
              value: {
                show: true,
                fontSize: isSmallScreen ? "10px" : "16px",
                color: undefined,
                offsetY: 16,

                formatter: function (val) {
                  return val;
                }
              },
              total: {
                show: true,
                label: "Total",
                fontSize: isSmallScreen ? "10px" : "20px",
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
    series: pieResidents !== undefined ? pieResidents : [0]
  };

  return (
    <BoxChart>
      <Chart
        style={{
          width: "100%",
          minWidth: "200px",
          maxWidth: "450px",
          height: "100vh",
          maxHeight: isSmallScreen ? "200px" : "270px"
        }}
        options={state.options}
        series={state.series}
        type="donut"
      />
    </BoxChart>
  );
};

export const ColumnCharts = () => {
  const [column, setColumn] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-allpathologys-patients", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setColumn(response.data);
    });
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  const state = {
    series: [
      {
        data: column?.totalpathology !== undefined ? column.totalpathology : [0]
      }
    ],
    chart: {
      type: "bar",
      toolbar: {
        show: false
      }
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: 20,
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
      categories: column?.pathology !== undefined ? column.pathology : [""],
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 400
        }
      }
    }
  };

  return (
    <BoxChart>
      <Chart
        style={{
          width: "100%",
          minWidth: "250px",
          maxHeight: "270px"
        }}
        options={state}
        series={state.series}
        type="bar"
        height={260}
      />
    </BoxChart>
  );
};
export const TreemapCharts = () => {
  const [map, setMap] = useState();

  useEffect(async () => {
    await ApiServer.get("/list-residents-address", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setMap(response.data);
      console.log(response.data);
    });
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  const state = {
    chart: {
      height: 350,
      toolbar: {
        show: false
      },
      type: "treemap"
    },
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    },
    series: [
      {
        data: map
      }
    ]
  };

  return (
    <BoxChart>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1%"
        }}
      >
        Pacientes Por Municipio
      </Typography>
      <Chart
        style={{
          width: "100%",
          minWidth: "250px",
          maxHeight: "270px",
          paddingLeft: "2.2%"
        }}
        options={state}
        series={state.series}
        type="treemap"
        height={260}
      />
    </BoxChart>
  );
};
export const LineCharts = () => {
  const [lineMoviments, setLineMoviments] = useState();
  const date = new Date();
  let startdate = moment(date).format("YYYY-MM-") + "01";
  let enddate = moment(date).format("YYYY-MM-") + "31";

  useEffect(async () => {
    await ApiServer.post(
      "/list-pricesmovements-residents",
      { startdate: startdate, enddate: enddate },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      setLineMoviments(response.data);
    });
  }, []);

  const state = {
    series: [
      {
        name: "Valor",
        data: lineMoviments !== undefined ? lineMoviments : [{ x: 0, y: 0 }]
      }
    ],

    chart: {
      type: "area",
      height: 200,
      locales: [ptbr],
      stacked: false,
      defaultLocale: "pt-br",
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: true
    },
    colors: ["#FF9800"],

    markers: {
      size: [4, 7]
    },

    title: {
      text: "Valores Movimentados ",
      align: "left"
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
    <BoxChart>
      <Chart
        style={{ width: "100%", minWidth: "250px" }}
        options={state}
        series={state.series}
        height="260px"
        type="area"
      />
    </BoxChart>
  );
};

export const ExpenseCharts = () => {
  return (
    <BoxChart>
      <BoxChartMin
        title={"R$ 500,00"}
        subtitle={"Desepesas Mês"}
        color={"#d43a00"}
        gradient={
          "linear-gradient(90deg, rgba(212,58,0,1) 80%, rgba(240,105,55,1) 100%)"
        }
        icon={<ArrowDownwardIcon sx={{ color: "#d43a00" }} />}
      />
    </BoxChart>
  );
};

export const CuredCharts = () => {
  const [patientscured, setPatientsCured] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-patientscured-byyear", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setPatientsCured(response.data);
    });
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  return (
    <BoxChart>
      <BoxChartMin
        title={patientscured?.count ? patientscured.count : 0}
        subtitle={"Curados Ano"}
        color={"#40957f"}
        gradient={
          "linear-gradient(90deg, rgba(64,149,127,0.9697128851540616) 70%, rgba(86,204,173,1) 100%)"
        }
        icon={<ArrowUpwardIcon sx={{ color: "#40957f" }} />}
      />
    </BoxChart>
  );
};

export const DeadCharts = () => {
  const [patientsdead, setPatientsDead] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-patientsdead-byyear", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setPatientsDead(response.data);
    });
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  return (
    <BoxChart>
      <BoxChartMin
        title={patientsdead?.count ? patientsdead.count : 0}
        subtitle={"Obitos Ano"}
        color={"#405059"}
        gradient={
          "linear-gradient(90deg, rgba(64,80,89,1) 80%, rgba(96,123,138,1) 100%)"
        }
        icon={<ArrowDownwardIcon sx={{ color: "#405059" }} />}
      ></BoxChartMin>
    </BoxChart>
  );
};

export const FluxPatiensCharts = () => {
  return (
    <BoxChart>
      <FluxPatients />
    </BoxChart>
  );
};
