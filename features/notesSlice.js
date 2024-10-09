import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialState = {
  notes: [
    {
      _id: 1,
      text: "Haddis Menelik From Bahir Dar",
    },
    {
      _id: 2,
      text: "Haddis Menelik From Bahir Dar",
    },
  ],
};

// get all notes
export const getAllNotes = createAsyncThunk("notes/getAllNotes", async () => {
  try {
    const response = await axios.get("http://192.168.100.156:3001/api/notes");
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// add new note
export const addNewNote = createAsyncThunk("notes/addNewNote", async (data) => {
  try {
    const response = await axios.post(
      "http://192.168.100.156:3001/api/notes",
      data
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

// delete note
export const deleteNote = createAsyncThunk('notes/deleteNote', async _id => {
  try{
    const response = await axios.delete(
      `http://192.168.100.156:3001/api/notes?_id=${_id}`
    );
    return response.data
  }catch(err){
    return err.response.data
  }
})
// slice
// note slice
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all notes
      // pending
      .addCase(getAllNotes.pending, (state) => {
        console.log("Pending");
      })
      // fulfilled
      .addCase(getAllNotes.fulfilled, (state, action) => {
        console.log();
        if (action.payload?.notes) {
          state.notes = action.payload.notes;
        }
      })
      // rejected
      .addCase(getAllNotes.rejected, (state) => {
        console.log("Rejected");
      })
      // add new note
      // pending
      .addCase(addNewNote.pending, (state)=>{
        console.log("Add New Note Pending")
      })
      // fulfilled
      .addCase(addNewNote.fulfilled, (state,action)=>{
        if(action.payload?.note){
          state.notes.unshift(action.payload.note);
        }
      })
      // rejected
      .addCase(addNewNote.rejected, state => {
        console.log("Add New Note Rejected")
      })

      // delete note
      // pending
      .addCase(deleteNote.pending, state => {
        console.log("Delete Note Pending")
      })
      // fulfilled
      .addCase(deleteNote.fulfilled, (state,action)=>{
        if(action.payload?._id){
          state.notes = state.notes.filter(
            (noteItem) => noteItem._id !== action.payload?._id
          );
        }
      })
      // rejected
      .addCase(deleteNote.rejected, state => {
        console.log("Delete Note Rejected");
      })
  },
});

// selectors
// notes
export const notesSelector = (state) => state.notes.notes;

// reducer
export default noteSlice.reducer;
