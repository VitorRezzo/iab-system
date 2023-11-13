import { styled } from "@mui/system";

export const BoxMarkUI = styled("div")(({ background }) => ({
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
