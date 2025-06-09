import { createSlice } from '@reduxjs/toolkit'

export const storySlice=createSlice({
    name: 'stories',
    initialState: {
        stories:[],
        errormsg:""
    },
    reducers:{
        updateStories:(state,action)=>{
            state.stories=action.payload;
        },
        updateErrorMsg:(state,action)=>{
            state.errormsg=action.payload;
        }
    }
});

export const{updateErrorMsg,updateStories}=storySlice.actions;

export default storySlice.reducer;