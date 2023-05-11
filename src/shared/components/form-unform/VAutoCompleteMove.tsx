import { Autocomplete, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import React, { useEffect, useState } from "react";

import { TextFieldUI } from "./TextFieldUI";

type TVAutoCompleteProps = TextFieldProps & {
  name: string;
  labels: string;
  moveData: string[];
  placeholder?: string;
};

export const VAutoCompleteMove: React.FC<TVAutoCompleteProps> = ({
  name,
  labels,
  moveData,
  placeholder,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [data, setData] = useState(defaultValue || "");

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
      options={moveData === undefined ? [{}] : moveData}
      value={data === null ? "" : data}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onInputChange={(_, newValue) => setData(newValue)}
      renderInput={(params) => (
        <TextFieldUI
          {...params}
          {...rest}
          label={labels}
          placeholder={placeholder}
          error={!!error}
          onChange={(e) => {
            setData(e.target.value);
            rest.onChange?.(e);
          }}
          helperText={error}
          fullWidth={true}
          onKeyDown={() => (error ? clearError() : undefined)}
        />
      )}
    />
  );
};
