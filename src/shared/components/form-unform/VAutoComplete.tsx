import { TextField, Autocomplete, TextFieldProps } from "@mui/material";

import { useField } from "@unform/core";
import React, { useEffect, useState } from "react";
import { TextFieldUI } from "./TextFieldUI";
type TVAutoCompleteProps = TextFieldProps & {
  name: string;
  labels: string;
  option: string[];
  variant?: string;
  placeholder?: string;
};

export const VAutoComplete: React.FC<TVAutoCompleteProps> = ({
  name,
  labels,
  placeholder,
  variant,
  option,

  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const status = labels === "Status" ? "Na Casa" : "";
  const [data, setData] = useState(defaultValue || status);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => data,
      setValue: (_, newValue) => setData(newValue)
    });
  }, [registerField, fieldName, data]);

  return (
    <Autocomplete
      disablePortal
      options={option}
      value={data == null ? "" : data}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onInputChange={(_, newValue) => setData(newValue)}
      renderInput={(params) =>
        labels ? (
          <TextField
            {...params}
            {...rest}
            label={labels}
            placeholder={placeholder}
            error={!!error}
            variant={variant ? variant : "standard"}
            onChange={(e) => {
              setData(e.target.value);
              rest.onChange?.(e);
            }}
            helperText={error}
            fullWidth={true}
            onKeyDown={() => (error ? clearError() : undefined)}
          />
        ) : (
          <TextFieldUI
            {...params}
            {...rest}
            placeholder={placeholder}
            error={!!error}
            variant="outlined"
            onChange={(e) => {
              setData(e.target.value);
              rest.onChange?.(e);
            }}
            helperText={error}
            fullWidth={true}
            size="small"
            onKeyDown={() => (error ? clearError() : undefined)}
          />
        )
      }
    />
  );
};
