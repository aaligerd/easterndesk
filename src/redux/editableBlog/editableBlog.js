import { createSlice } from '@reduxjs/toolkit'
import editableBlankBloglogStructure from '../../utils/EditableBlogStructure'
import slugify from '../../utils/stringFormat';


export const editableBlogdSlice = createSlice({
  name: 'editabkleBlog',
  initialState:editableBlankBloglogStructure,
  reducers: {
        updateEditableContent: (state, action) => {
            state.content = action.payload;
        },
        updtaeEditableTitle: (state, action) => {
            state.title = action.payload;
        },
        updateEditableSeoDescription: (state, action) => {
            state.seo_desc = action.payload;
        },
        updateEditableSeoKeywords: (state, action) => {
            state.seo_keywords = action.payload;
        },
        updateEditableCategory: (state, action) => {
            state.category = action.payload;
        },
        updateEditableSubategory: (state, action) => {
            state.subcategory = action.payload;
        },
        updateEditableLables: (state, action) => {
            state.lables = action.payload;
        },
        updateEditableStatus: (state, action) => {
            state.status = action.payload;
        },
        updateEditableCreatedBy: (state, action) => {
            state.created_by = action.payload;
        },
        updateEditableCreatedDate: (state, action) => {
            state.created_date = action.payload;
        },
        updateEditableUpdatedBy: (state, action) => {
            state.updated_by = action.payload;
        },
        updateEditableUpdatedDate: (state, action) => {
            state.updated_at = action.payload;
        },
        addEditableLables: (state, action) => {
            state.lables.push(action.payload);
        },
        removeEditableLables: (state, action) => {
            state.lables.splice(action.payload, 1);
        },
        updateEditableSeoTitle: (state, action) => {
            state.seo_title = action.payload;
        },
        updateEditableSeoHeadline: (state, action) => {
            state.seo_headline = action.payload;
        },
        updateEditableSeoUrl: (state, action) => {
            state.seo_url = action.payload;
        },
        updateEditableSeoURLSlug: (state, action) => {
            let sulg=slugify(action.payload)
            state.seo_url_slug = sulg;
        },
        updateEditableThumbnail: (state, action) => {
            state.thumbnail = action.payload;
        },
        updateEditableBlogId: (state, action) => {
            state.blog_id = action.payload;
        },
        updateEditableUpdateContent: (state, action) => {
            state.updated_content = action.payload;
        }
  }
})

export const { updateEditableContent,updateEditableUpdatedDate,updateEditableUpdatedBy,updateEditableCreatedDate,updateEditableCreatedBy, updateEditableStatus,updateEditableLables,updateEditableCategory,updateEditableSeoKeywords,updateEditableSeoDescription,updtaeEditableTitle,updateEditableSubategory,updateEditableSeoTitle,updateEditableSeoHeadline,updateEditableSeoUrl,updateEditableThumbnail,addEditableLables,removeEditableLables,updateEditableSeoURLSlug,updateEditableBlogId,updateEditableUpdateContent} = editableBlogdSlice.actions

export default editableBlogdSlice.reducer