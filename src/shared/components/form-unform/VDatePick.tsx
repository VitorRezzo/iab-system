import React, { useEffect, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { TextField } from "@mui/material";
import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker";
import { useField } from "@unform/core";
import { TextFieldUI } from "./TextFieldUI";
import moment from "moment";
type TVDatePickProps = DatePickerProps & {
  name: string;
  labels: string;
  variants?: "outlined";
  sizes?: "small";
};

export const VDatePick: React.FC<TVDatePickProps> = ({
  name,
  labels,
  variants,
  sizes,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const today = labels === "Data do Cadastro" ? new Date() : "";
  const [date, setDate] = useState(defaultValue || today);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => moment(date).format(),
      setValue: (_, newValue) => setDate(newValue)
    });
  }, [registerField, fieldName, date]);

  return (
    <>
      <LocalizationProvider locale={ptBR} dateAdapter={DateAdapter}>
        <DatePicker
          {...rest}
          label={labels}
          value={date == null ? "" : date}
          onChange={(e) => {
            setDate(e);
            rest.onChange?.(e);
          }}
          renderInput={(params) =>
            labels ? (
              <TextField
                {...params}
                error={!!error}
                variant={variants ? variants : "standard"}
                helperText={error}
                onKeyDown={(e) => {
                  error && clearError();
                  params.onKeyDown?.(e);
                }}
                size={sizes ? sizes : "medium"}
                fullWidth
              />
            ) : (
              <TextFieldUI
                {...params}
                error={!!error}
                variant="outlined"
                size="small"
                helperText={error}
                onKeyDown={(e) => {
                  error && clearError();
                  params.onKeyDown?.(e);
                }}
              />
            )
          }
        />
      </LocalizationProvider>
    </>
  );
};
