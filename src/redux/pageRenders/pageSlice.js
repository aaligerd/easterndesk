import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'pageRenders',
  initialState:{
    component:"dashboard"
  },
  reducers: {
    updatePageRenders: (state,action) => {
      state.component =action.payload;
    }
  }
})

export const { updatePageRenders} = pageSlice.actions

export default pageSlice.reducer