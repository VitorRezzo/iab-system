import React, { useEffect, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ptBR } from "date-fns/locale";

import TimePicker, { TimePickerProps } from "@mui/lab/TimePicker";
import { useField } from "@unform/core";
import { TextFieldUI } from "./TextFieldUI";
type TVTimePickerProps = TimePickerProps & {
  name: string;
  label?: string;
};

export const VTimePicker: React.FC<TVTimePickerProps> = ({
  name,
  label,
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

  return (
    <>
      <LocalizationProvider locale={ptBR} dateAdapter={DateAdapter}>
        <TimePicker
          {...rest}
          label={label}
          value={value}
          onChange={(data) => setValue(data)}
          renderInput={(params) => <TextFieldUI {...params} size="small" />}
        />
      </LocalizationProvider>
    </>
  );
};
