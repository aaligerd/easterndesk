import React, { useEffect, useState } from 'react'
import '../style/UpdateBlog.css';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateContent, updatecreatedBy, updatecreatedDate, updateStatus } from '../redux/blog/blogSlice';
import { getCurrentDatetimeString } from '../utils/GetDateStructure';
import { updateEditableBlogId, updateEditableCategory, updateEditableContent, updateEditableLables, updateEditableSeoDescription, updateEditableSeoHeadline, updateEditableSeoKeywords, updateEditableSeoTitle, updateEditableSeoUrl, updateEditableSeoURLSlug, updateEditableStatus, updateEditableSubategory, updateEditableThumbnail, updateEditableUpdatedBy, updateEditableUpdatedDate, updtaeEditableTitle } from '../redux/editableBlog/editableBlog';
import UpdateBlogEditor from '../components/UpdateBlogEditor';
import UpdateBlogInputs from '../components/UpdateblogInputs';

import { GridLoader } from 'react-spinners';
function UpdateBlog() {
  
  const editorRef = React.useRef();
  const { status } = useSelector((state) => state.editableblog);
  const editorBlogData = useSelector((state) => state.editableblog);
  const dispatch = useDispatch();
  const { blog_id } = useParams();
  const[loaderVisible, setLoaderVisible] = useState(false);

  console.log(blog_id);

  useEffect(() => {
    const fetchBlogData = async () => {
      const headers = new Headers();
      headers.append("Content-type", 'application/json');
      const reqOptions = { method: "GET", headers };
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/story/get/cms/story/${blog_id}`, reqOptions);
        const resData = await res.json();
        if (res.status === 400 || res.status === 404 || res.status === 500) {
          alert(resData.msg.toUpperCase());
          return;
        }
        console.log(JSON.parse(resData.data.content));
        dispatch(updateEditableContent(JSON.parse(resData.data.content)));
        dispatch(updtaeEditableTitle(resData.data.title));
        dispatch(updatecreatedBy(resData.data.created_by));
        dispatch(updatecreatedDate(resData.data.created_date));
        dispatch(updateStatus(resData.data.status));
        dispatch(updateEditableLables(resData.data.lables.split(',')));
        dispatch(updateEditableCategory(resData.data.category_id));
        dispatch(updateEditableSubategory(resData.data.subcategory_id));
        dispatch(updateEditableSeoTitle(resData.data.seo_title));
        dispatch(updateEditableSeoHeadline(resData.data.seo_headline));
        dispatch(updateEditableSeoDescription(resData.data.seo_description));
        dispatch(updateEditableSeoKeywords(resData.data.seo_keywords));
        dispatch(updateEditableSeoUrl(resData.data.seo_url));
        dispatch(updateEditableSeoURLSlug(resData.data.seo_url));
        dispatch(updateEditableThumbnail(resData.data.thumbnail_url));
        dispatch(updateEditableStatus(resData.data.status));
        dispatch(updateEditableBlogId(blog_id));
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogData();
  }, [blog_id, dispatch]);

  let saveBlog = async () => {
    const editorState = await editorRef.current.save();
    
    dispatch(updateEditableUpdatedBy("ED10002"));
    dispatch(updateEditableUpdatedDate(getCurrentDatetimeString()));
    dispatch(updateEditableContent(JSON.stringify(editorState)));
    setLoaderVisible(true);
    setTimeout(() => {
      const headers = new Headers();
      headers.append("Content-type", 'application/json')
      const reqOptions = { method: "POST", headers, body: JSON.stringify(editorBlogData) }
      const saveData = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/story/save`, reqOptions);
          const resData = await res.json();
          if (res.status === 400) {
            alert(resData.msg.toUpperCase());
            return;
          }
          alert("Post Save");

        } catch (error) {
          console.log(error)
        }
      }
      saveData();
      setLoaderVisible(false);
    }, 2000)
  };

  const publishBlog=async () => {
    console.log("publishBlog")
  }
  const unpublishBlog=async () => {
    console.log("unpublishBlog")
  }
  return (

    <div className='blog-container'>
      <div className='editor-button-groups'>
        <button onClick={saveBlog}>Save</button>
        {console.log(status)}
        {status && (status === "draft" ? <button onClick={publishBlog}>Publish</button> : <button onClick={unpublishBlog}>Unpublish</button>)}

      </div>
      <div className='blog-editor-container'>
        <UpdateBlogEditor editorRef={editorRef} />
      </div>
      <div className='blog-data-container'>
        <UpdateBlogInputs />
      </div>
      <div className='footer'>
        <h3>EasternDesk</h3>
      </div>
      <div className='loading-container'>
      <GridLoader
        color="#767676"
        loading={loaderVisible}
        margin={10}
        size={20}
      />
      </div>
    </div>

  )
}

export default UpdateBlog