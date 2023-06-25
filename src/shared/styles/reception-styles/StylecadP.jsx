import { styled } from "@mui/system";

export const MenuAddCompanion = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "33%",
  width: "25%",
  height: "40px",
  borderRadius: "5px",
  transition: "height 1s ease-out",
  overflow: " hidden",

  backgroundColor: " #0CABA8",
  "&:hover": {
    height: "155px"
  }
});

export const SubMenuCompanion = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  font: "#fff"
});
export const TitleMenuAcom = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2%",
  color: " #fff",
  fontSize: "1rem"
});

export const SubTitleMenuAcom = styled("div")({
  color: " #fff",
  fontSize: "1rem"
});

export const BoxMark = styled("div")(({ background }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "-2.8%",
  paddingTop: "10px",
  marginLeft: "1%",
  paddingBottom: "25px",
  width: "12rem",
  height: "10px",
  borderRadius: "5px",
  transition: "height 0.7s",
  cursor: "pointer",
  color: "#f2f2f2",
  background: background,
  "&:hover": {
    height: "20px"
  }
}));

export const SRButton = styled("div")(({ background }) => ({
  display: "flex",
  justifyContent: "center",
  paddingTop: "2px",
  marginLeft: "7%",
  marginTop: "5%",
  width: "12rem",
  height: "40px",
  borderRadius: "5px",
  transition: "height 0.7s",
  cursor: "pointer",
  color: "#f2f2f2",
  background: background,
  "&:hover": {
    height: "45px"
  }
}));
