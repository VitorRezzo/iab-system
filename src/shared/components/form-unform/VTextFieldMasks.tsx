import { TextField, TextFieldProps } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useField } from "@unform/core";

import { mask as masker } from "remask";

type TVTextFielMaskProps = TextFieldProps & {
  name: string;
  labeltext: string;
};

export const VTextFieldMasks: React.FC<TVTextFielMaskProps> = ({
  name,
  labeltext,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = useState(defaultValue || "");
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    });
  }, [registerField, fieldName, value]);

  const handleChange = (value: string) => {
    if (labeltext === "CPF") {
      setValue(masker(value, "999.999.999-99"));
    } else {
      setValue(masker(value, "(99) 9 9999-9999"));
    }
  };
  return (
    <TextField
      {...rest}
      label={labeltext}
      error={!!error}
      helperText={error}
      value={value == null ? "" : value}
      onChange={(e) => {
        handleChange(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
      fullWidth
      variant="standard"
    />
  );
};
