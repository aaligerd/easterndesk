import { createSlice } from '@reduxjs/toolkit'
import blankBloglogStructure from '../../utils/BlogStructure'
import slugify from '../../utils/stringFormat';

export const blogSlice = createSlice({
    name: 'blog',
    initialState: blankBloglogStructure,
    reducers: {
        updateTitle: (state, action) => {
            state.title = action.payload;
        },
        updateContent: (state, action) => {
            state.content = action.payload;
        },
        updatecreatedBy: (state, action) => {
            state.created_by = action.payload;
        },
        updatecreatedDate: (state, action) => {
            state.created_date = action.payload;
        },
        updateCategory: (state, action) => {
            state.category = action.payload.toLowerCase().trim();
        },

        updateSubcategory: (state, action) => {
            state.subcategory = action.payload.toLowerCase().trim();
        },
        addLables: (state, action) => {
            state.lables.push(action.payload);
        },
        removeLables: (state, action) => {
            state.lables.splice(action.payload, 1);
        },
        updateSeoTitle: (state, action) => {
            state.seo_title = action.payload;
        },
        updateSeoHeadline: (state, action) => {
            state.seo_headline = action.payload;
        },
        updateSeoDesc: (state, action) => {
            state.seo_desc = action.payload;
        },
        updateSeoKeyWords: (state, action) => {
            state.seo_keywords = action.payload;
        },
        updateSeoURL: (state, action) => {
            state.seo_url = action.payload;
        },
        updateSeoURLSlug: (state, action) => {
            let sulg=slugify(action.payload)
            state.seo_url_slug = sulg;
        },
        updateSeoThumbnail: (state, action) => {
            state.thumbnail = action.payload;
        },
        updateStatus: (state, action) => {
            state.status = action.payload;
        },
        updatePublisedAt: (state, action) => {
            state.published_at = action.payload;
        },
        updateUpdatedBy: (state, action) => {
            state.updated_by = action.payload;
        },
        updateUpdatedAt: (state, action) => {
            state.updated_at = action.payload;
        },
        updateBlogId: (state, action) => {
            console.log(action.payload)
            state.blog_id = action.payload;
        }
    }
})

export const { updateTitle,updateContent, updateCategory, updatecreatedBy, updatecreatedDate, updateSubcategory, addLables, removeLables, updateSeoTitle, updateSeoDesc, updateSeoKeyWords, updateSeoURL, updateSeoThumbnail,updateUpdatedAt,updateUpdatedBy,updatePublisedAt,updateStatus,updateSeoHeadline,updateSeoURLSlug,updateBlogId} = blogSlice.actions

export default blogSlice.reducer