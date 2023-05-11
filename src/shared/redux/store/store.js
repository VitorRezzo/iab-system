import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cameraFileMenuReducer } from "../slices/camera-file-slice/CameraFileSlice";
import { companionFormReducer } from "../slices/camera-file-slice/CompanionFormSlice";

const rootReducer = combineReducers({
  cameraFileMenu: cameraFileMenuReducer,
  companionForm: companionFormReducer
});

export const store = configureStore({
  reducer: rootReducer
});
