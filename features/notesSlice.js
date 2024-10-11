import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// config
// socket
import {SOCKET} from '../config'

// initial state
const initialState = {
    notes: []
}

// get all notes
export const getNotes = createAsyncThunk("notes/getNotes", async () => {
    try {
        const response = await axios.get("/api/notes")
        return response.data
    } catch (err) {
        return err.response.data
    }
})

// add new note
export const addNewNote = createAsyncThunk('notes/addNewNote', async data => {
    try {
        const response = await axios.post("/api/notes/new", data)
        return response.data
    } catch (err) {
        return err.response.data
    }
})

// delete note
export const deleteNote = createAsyncThunk("notes/deleteNote", async _id => {
    try{
        const response = await axios.delete(`/api/notes/delete/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// slice
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNewNoteEvent: (state,action) => {
            state.notes.push(action.payload)
        },
        deleteNoteEvent: (state,action) => {
            state.notes = state.notes.filter(noteItem => noteItem._id !== action.payload)
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // get notes
            // pending
            .addCase(getNotes.pending, state => {
                console.log("GET NOTES PENDING")
            })
            // fulfilled
            .addCase(getNotes.fulfilled, (state,action)=>{
                console.log()
                if(action.payload.notes){
                    state.notes = action.payload.notes
                }
            })
            // rejected
            .addCase(getNotes.rejected, state => {
                console.log("GET NOTES REJECTED")
            })
            // add new note
            // pending
            .addCase(addNewNote.pending, state => {
                console.log("ADD NEW NOTE PENDING")
            })
            // fulfilled
            .addCase(addNewNote.fulfilled, (state,action)=>{
                if(action.payload.note){
                    SOCKET.emit("addNewNote",action.payload.note)
                    state.notes.push(action.payload.note)
                }
            })
            // rejected
            .addCase(addNewNote.rejected, state => {
                console.log("ADD NEW NOTE REJECTED")
            })
            // delete note
            // pending
            .addCase(deleteNote.pending, state => {
                console.log("DELETE NOTE PENDING")
            })
            // fulfilled
            .addCase(deleteNote.fulfilled, (state,action)=>{
                console.log()
                if(action.payload?._id){
                    SOCKET.emit('deleteNote',action.payload?._id)
                    // state.notes = state.notes.filter(noteItem => noteItem._id !== action.payload?._id)
                }
            })
            // rejected
            .addCase(deleteNote.rejected, state => {
                console.log("DELETE NOTE REJECTED")
            })
    }
})

// selectors
// notes selector
export const notesSelector = state => state.notes.notes

// actions
export const {
    addNewNoteEvent,
    deleteNoteEvent
} = notesSlice.actions

// reducers
export default notesSlice.reducer