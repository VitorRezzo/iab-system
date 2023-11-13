import { createSlice } from "@reduxjs/toolkit";

const movementPageSlice = createSlice({
  name: "movementPageSlice",
  initialState: {
    stateMoveForm: { open: false, type: null },
    isChecked: false,
    residentData: ""
  },
  reducers: {
    setStateMoveForm: (state, action) => {
      state.stateMoveForm.open = action.payload?.open;
      state.stateMoveForm.type = action.payload?.type;
    },
    setIsChecked: (state, action) => {
      state.isChecked = action.payload;
    },
    setResidentData: (state, action) => {
      state.residentData = action.payload;
    }
  }
});

export const { setStateMoveForm, setIsChecked, setResidentData } =
  movementPageSlice.actions;

export const movementPageSliceReducer = movementPageSlice.reducer;
