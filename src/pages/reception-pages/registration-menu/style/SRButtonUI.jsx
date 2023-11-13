import { styled } from "@mui/system";

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
