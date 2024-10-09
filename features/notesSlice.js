import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

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
export const getAllNotes = createAsyncThunk('notes/getAllNotes', async () => {
    try {
        const response = await axios.get(
          "http://192.168.100.156:3001/api/notes"
        );
        return response.data
    } catch (err) {
        return err.response.data
    }
})

// slice
// note slice
const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            // get all notes
            // pending
            .addCase(getAllNotes.pending , state => {
                console.log("Pending")
            })
            // fulfilled
            .addCase(getAllNotes.fulfilled, (state,action)=>{
                console.log()
                if(action.payload?.notes){
                    state.notes = action.payload.notes;
                }
            })
            // rejected
            .addCase(getAllNotes.rejected, state => {
                console.log("Rejected")
            })
    }
})

// selectors
// notes 
export const notesSelector = state => state.notes.notes

// reducer
export default noteSlice.reducer