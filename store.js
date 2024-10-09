import {configureStore} from '@reduxjs/toolkit'

// reducers
// notes
import notesReducer from "./features/notesSlice";

// store
export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});