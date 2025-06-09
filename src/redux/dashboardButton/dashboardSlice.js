import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
  name: 'dashboardTab',
  initialState:{
    component:"stories"
  },
  reducers: {
    updateDashboardTab: (state,action) => {
      state.component =action.payload;
    }
  }
})

export const { updateDashboardTab} = dashboardSlice.actions

export default dashboardSlice.reducer