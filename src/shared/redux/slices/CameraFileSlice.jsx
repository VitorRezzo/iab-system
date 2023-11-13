import { createSlice } from "@reduxjs/toolkit";

const cameraFileSlice = createSlice({
  name: "cameraFileSlice",
  initialState: {
    imageUrl: "",
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
      state.imageMultUrls.push(action.payload);
    },
    resetImageMultUrls: (state, action) => {
      state.imageMultUrls.length = action.payload;
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
  resetImageMultUrls,
  removeImageMultUrls
} = cameraFileSlice.actions;

export const cameraFileMenuReducer = cameraFileSlice.reducer;
