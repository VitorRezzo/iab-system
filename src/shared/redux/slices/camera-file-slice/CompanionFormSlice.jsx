import { createSlice } from "@reduxjs/toolkit";

const companionFormSlice = createSlice({
  name: "companionFormSlice",
  initialState: {
    amoutForm: 0,
    dataCompanionForm: []
  },
  reducers: {
    setAmoutForm: (state, action) => {
      state.amoutForm = action.payload;
    },
    setIncremetAmoutForm: (state, action) => {
      state.amoutForm += action.payload;
    },
    setDecrementAmoutForm: (state, action) => {
      state.amoutForm -= action.payload;
    },
    setDataCompanionForm: (state, action) => {
      state.dataCompanionForm = [...state.dataCompanionForm, ...action.payload];
    },
    removeDataCapanionForm: (state, action) => {
      state.dataCompanionForm.splice(action.payload, 1);
    }
  }
});

export const {
  setAmoutForm,
  setIncremetAmoutForm,
  setDecrementAmoutForm,
  setDataCompanionForm,
  removeDataCapanionForm
} = companionFormSlice.actions;

export const companionFormReducer = companionFormSlice.reducer;
