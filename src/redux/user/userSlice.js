import { createSlice } from '@reduxjs/toolkit'

export const userSlice=createSlice({
    name: 'stories',
    initialState: {
        islogin:false,
        username:"",
        userid:""

    },
    reducers:{
        updateIsLogin:(state,action)=>{
            state.islogin=action.payload;
        },
        updateUsername:(state,action)=>{
            state.username=action.payload;
        },
        updateUserId:(state,action)=>{
            state.userid=action.payload;
        },
    }
});

export const{updateUsername,updateIsLogin,updateUserId}=userSlice.actions;

export default userSlice.reducer;