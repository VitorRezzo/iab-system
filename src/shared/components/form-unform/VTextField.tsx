import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import React, { useEffect, useMemo, useState } from "react";

type TVTextFieldProps = TextFieldProps & {
  name: string;
  data?: number;
  color?: string;
};

export const VTextField: React.FC<TVTextFieldProps> = ({
  name,
  data,
  color,
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

  useMemo(() => {
    return setValue(data);
  }, [data]);

  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      value={value == null ? "" : value}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
      inputProps={{ style: { color: color } }}
      fullWidth
      variant={rest.variant ? rest.variant : "standard"}
    />
  );
};
