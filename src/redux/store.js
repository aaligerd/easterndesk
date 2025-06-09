import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blog/blogSlice';
import pageReducer from './pageRenders/pageSlice';
import dashboardReducers from './dashboardButton/dashboardSlice';
import storySliceReducers from './stories/storySlice';
import editorblogReducer from './editableBlog/editableBlog';


export default configureStore({
  reducer: {
    blog:blogReducer,
    pageRenders:pageReducer,
    dashboardTab:dashboardReducers,
    stories:storySliceReducers,
    editableblog:editorblogReducer
  }
})