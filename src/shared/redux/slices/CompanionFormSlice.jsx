import { createSlice } from "@reduxjs/toolkit";

const companionFormSlice = createSlice({
  name: "companionFormSlice",
  initialState: {
    amoutForm: 0,
    dataCompanionForm: [],
    openDialogForm: false
  },
  reducers: {
    setAmoutForm: (state, action) => {
      state.amoutForm = action.payload;
    },
    setOpenDialogForm: (state, action) => {
      state.openDialogForm = action.payload;
    },
    setIncremetAmoutForm: (state, action) => {
      state.amoutForm += action.payload;
    },
    setDecrementAmoutForm: (state, action) => {
      state.amoutForm -= action.payload;
    },
    setDataCompanionForm: (state, action) => {
      state.dataCompanionForm.push(action.payload);
    },
    resetCompanionForm: (state, action) => {
      state.dataCompanionForm.length = action.payload;
    },
    removeDataCapanionForm: (state, action) => {
      state.dataCompanionForm.splice(action.payload, 1);
    }
  }
});

export const {
  setAmoutForm,
  setOpenDialogForm,
  setIncremetAmoutForm,
  setDecrementAmoutForm,
  setDataCompanionForm,
  removeDataCapanionForm,
  resetCompanionForm
} = companionFormSlice.actions;

export const companionFormReducer = companionFormSlice.reducer;
