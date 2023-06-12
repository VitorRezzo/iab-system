import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cameraFileMenuReducer } from "../slices/camera-file-slice/CameraFileSlice";
import { companionFormReducer } from "../slices/camera-file-slice/CompanionFormSlice";
import { reportsMenuSliceReducer } from "../slices/camera-file-slice/ReportsMenuSlice";

const rootReducer = combineReducers({
  cameraFileMenu: cameraFileMenuReducer,
  companionForm: companionFormReducer,
  reportsMenu: reportsMenuSliceReducer
});

export const store = configureStore({
  reducer: rootReducer
});
