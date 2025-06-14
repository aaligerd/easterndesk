import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blog/blogSlice';
import pageReducer from './pageRenders/pageSlice';
import dashboardReducers from './dashboardButton/dashboardSlice';
import storySliceReducers from './stories/storySlice';
import editorblogReducer from './editableBlog/editableBlog';
import userReducer from './user/userSlice';


export default configureStore({
  reducer: {
    blog:blogReducer,
    pageRenders:pageReducer,
    dashboardTab:dashboardReducers,
    stories:storySliceReducers,
    activeUser:userReducer,
    editableblog:editorblogReducer
  }
})