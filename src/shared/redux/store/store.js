import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { cameraFileMenuReducer } from "../slices/CameraFileSlice";
import { companionFormReducer } from "../slices/CompanionFormSlice";
import { reportsMenuSliceReducer } from "../slices/ReportsMenuSlice";
import { movementPageSliceReducer } from "../slices/MovementPageSlice";
const rootReducer = combineReducers({
  cameraFileMenu: cameraFileMenuReducer,
  companionForm: companionFormReducer,
  reportsMenu: reportsMenuSliceReducer,
  movementPage: movementPageSliceReducer
});

export const store = configureStore({
  reducer: rootReducer
});
