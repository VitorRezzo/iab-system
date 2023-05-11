import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TextFieldUI = styled(TextField)({
  "& label.Mui-focused": {
    color: "#0D0D0D"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#17f9ff"
  },

  "& .MuiOutlinedInput-root": {
    color: "#0D0D0D",
    "& fieldset": {
      borderColor: "#005bc5",
      borderRadius: "20px"
    },
    "&:hover fieldset": {
      borderColor: "#17f9ff"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#17f9ff"
    }
  }
});
