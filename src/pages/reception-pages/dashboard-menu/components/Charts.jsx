import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { FluxResidents } from "./FluxResidents";
import { useMediaQuery, useTheme, Typography } from "@mui/material";
import ptbr from "../../../../constants/pt-br.json";
import { BoxChart } from "./BoxChart";
import { BoxChartMin } from "./BoxChart";
import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

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
                label: "Na Casa",
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

          maxHeight: isSmallScreen ? "200px" : "300px"
        }}
        options={state.options}
        series={state.series}
        height={340}
        type="donut"
      />
    </BoxChart>
  );
};

export const ColumnCharts = () => {
  const [column, setColumn] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-allpatients-pathologys", {
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
      width: 10,
      toolbar: {
        show: false
      }
    },

    plotOptions: {
      bar: {
        barHeight: "25%",
        horizontal: false,
        distributed: true,
        columnWidth: "15%"
      }
    },

    legend: {
      show: true
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    xaxis: {
      labels: {
        show: false
      },
      categories: column?.pathology !== undefined ? column.pathology : [""]
    },
    tooltip: {
      theme: "light",
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function () {
            return "";
          }
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
          maxHeight: "350px"
        }}
        options={state}
        series={state.series}
        type="bar"
        height={350}
      />
    </BoxChart>
  );
};

export const TreemapCharts = () => {
  const [map, setMap] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-residentsby-address", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setMap(response.data);
    });
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  const state = {
    chart: {
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
        data: map ? map : [{ x: "", y: "" }]
      }
    ]
  };

  return (
    <BoxChart>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          padding: "1%"
        }}
      >
        Moradores Por Municipio
      </Typography>
      <Chart
        style={{
          minWidth: "250px",
          maxHeight: "300px",
          padding: "2% 5%"
        }}
        options={state}
        series={state.series}
        type="treemap"
        height={300}
      />
    </BoxChart>
  );
};

export const LineCharts = () => {
  const [lineExpenses, setLineExpenses] = useState();
  const date = new Date();
  let startdate = moment(date).format("YYYY-MM-") + "01";
  let enddate = moment(date).format("YYYY-MM-") + "31";

  useEffect(async () => {
    await ApiServer.post(
      "/count-allresidents-Expenses",
      { startdate: startdate, enddate: enddate },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      setLineExpenses(response.data);
    });
  }, []);

  const state = {
    series: [
      {
        name: "Valor",
        data: lineExpenses !== undefined ? lineExpenses : [{ x: 0, y: 0 }]
      }
    ],

    chart: {
      type: "area",
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
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          padding: "1%"
        }}
      >
        Desepesas dos Moradores
      </Typography>
      <Chart
        style={{ width: "100%", minWidth: "250px" }}
        options={state}
        series={state.series}
        height={300}
        type="area"
      />
    </BoxChart>
  );
};

export const TotalResidentsCharts = () => {
  const [allResidents, setAllResidents] = useState();
  useEffect(async () => {
    await ApiServer.get("/count-allresidents", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setAllResidents(response.data);
    });
  }, []);
  const formatter = new Intl.NumberFormat("pt-BR");

  return (
    <BoxChartMin
      title={formatter.format(allResidents)}
      subtitle={"Total Acolhidos"}
      variant={"h1"}
      color={"#2e15ed"}
      gradient={"linear-gradient(90deg, #2e15ed 80%, #2e15ed 100%)"}
      icon={
        <VolunteerActivismIcon
          sx={{
            marginLeft: "70%",
            width: "50px",
            transform: "scaleX(-1)",
            height: "50px",
            opacity: "60%",
            color: "#2e15ed"
          }}
        />
      }
    />
  );
};

export const InpatientCharts = () => {
  const formatter = new Intl.NumberFormat("pt-BR");
  return (
    <BoxChartMin
      title={formatter.format("0")}
      subtitle={"Internado"}
      color={"#ba2d2d"}
      gradient={"linear-gradient(90deg, #ba2d2d 80%, #ba2d2d 100%)"}
      icon={<LocalHospitalIcon fontSize="small" sx={{ color: "#ba2d2d" }} />}
    />
  );
};

export const ExpenseCharts = () => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return (
    <BoxChartMin
      title={formatter.format("53")}
      subtitle={"Desepesas Mês"}
      color={"#e87624"}
      variant="h2"
      gradient={"linear-gradient(90deg, #e87624 80%, #e87624 100%)"}
      icon={
        <TrendingDownIcon
          sx={{
            width: "35px",
            height: "35px",
            color: "#e87624",
            marginLeft: "70%"
          }}
        />
      }
    />
  );
};

export const CuredCharts = () => {
  const [patientscured, setPatientsCured] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-patientscured", {
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
    <BoxChartMin
      title={patientscured?.count ? patientscured.count : 0}
      subtitle={"Curados"}
      color={"#40957f"}
      gradient={
        "linear-gradient(90deg, rgba(64,149,127,0.9697128851540616) 70%, rgba(86,204,173,1) 100%)"
      }
      icon={<InsertEmoticonIcon fontSize="small" sx={{ color: "#40957f" }} />}
    />
  );
};

export const EnterTodayCharts = () => {
  const [residentsEnter, setResidentsEnter] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-residentsenter", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setResidentsEnter(response.data);
    });
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  return (
    <BoxChartMin
      title={residentsEnter?.count ? residentsEnter.count : 0}
      subtitle={"Entrada Hoje"}
      color={"#1693a5"}
      gradient={"linear-gradient(90deg, #1693a5 70%, #1693a5 100%)"}
      icon={<ArrowUpwardIcon fontSize="small" sx={{ color: "#1693a5" }} />}
    />
  );
};

export const ExitTodayCharts = () => {
  const [residentsExit, setResidentsExit] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-residentsexit", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setResidentsExit(response.data);
    });
    /*
    socket.emit("connection");
    socket.on("ObserserAllPatient", (data) => console.log(data));
    return socket.off("ObserserAllPatient");
    */
  }, []);

  return (
    <BoxChartMin
      title={residentsExit?.count ? residentsExit.count : 0}
      subtitle={"Saida Hoje"}
      color={"#a3aa14"}
      gradient={"linear-gradient(90deg, #a3aa14 70%, #c7c730 100%)"}
      icon={<ArrowDownwardIcon fontSize="small" sx={{ color: "#a3aa14" }} />}
    />
  );
};

export const DeadCharts = () => {
  const [patientsdead, setPatientsDead] = useState();

  useEffect(async () => {
    await ApiServer.get("/count-patientsdead", {
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
    <BoxChartMin
      title={patientsdead?.count ? patientsdead.count : 0}
      subtitle={"Óbitos"}
      color={"#405059"}
      gradient={
        "linear-gradient(90deg, rgba(64,80,89,1) 80%, rgba(96,123,138,1) 100%)"
      }
      icon={<MoodBadIcon fontSize="small" sx={{ color: "#405059" }} />}
    ></BoxChartMin>
  );
};

export const FluxResidentCharts = () => {
  return (
    <BoxChart>
      <FluxResidents />
    </BoxChart>
  );
};
