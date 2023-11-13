import { styled } from "@mui/system";

export const MenuCPUI = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#fff",
  marginLeft: "35%",
  width: "25%",
  height: "40px",
  borderRadius: "5px",
  transition: "height 1s ease-out",
  overflow: " hidden",
  backgroundColor: " #0CABA8",
  "&:hover": {
    height: "80px"
  }
});

export const SubMenuCPUI = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
});
