import { createSlice } from "@reduxjs/toolkit";

const reportsMenuSlice = createSlice({
  name: "reportsMenuSlice",
  initialState: {
    patientTable: null,
    companionTable: null
  },
  reducers: {
    setPatientTable: (state, action) => {
      state.patientTable = action.payload;
    },
    setCompanionTable: (state, action) => {
      state.companionTable = action.payload;
    }
  }
});

export const { setPatientTable, setCompanionTable } = reportsMenuSlice.actions;

export const reportsMenuSliceReducer = reportsMenuSlice.reducer;
