import { createSlice } from "@reduxjs/toolkit";

const cameraFileSlice = createSlice({
  name: "cameraFileSlice",
  initialState: {
    imageUrl: null,
    imageMultUrls: [],
    stateModal: false
  },
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setStateModal: (state, action) => {
      state.stateModal = action.payload;
    },
    setImageMultUrls: (state, action) => {
      state.imageMultUrls = [...state.imageMultUrls, ...action.payload];
    },
    removeImageMultUrls: (state, action) => {
      state.imageMultUrls.splice(action.payload, 1);
    }
  }
});

export const {
  setImageUrl,
  setStateModal,
  setImageMultUrls,
  removeImageMultUrls
} = cameraFileSlice.actions;

export const cameraFileMenuReducer = cameraFileSlice.reducer;
