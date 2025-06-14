import React, { useEffect, useState } from 'react'
import '../style/UpdateBlog.css';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDatetimeString } from '../utils/GetDateStructure';
import { updateEditableBlogId, updateEditableByLine, updateEditableCategory, updateEditableContent, updateEditableEditedBy, updateEditableLables, updateEditablePublishedBy, updateEditableSeoDescription, updateEditableSeoHeadline, updateEditableSeoKeywords, updateEditableSeoTitle, updateEditableSeoUrl, updateEditableSeoURLSlug, updateEditableStatus, updateEditableSubategory, updateEditableThumbnail, updateEditableUpdateContent, updateEditableUpdatedBy, updateEditableUpdatedDate, updtaeEditableTitle } from '../redux/editableBlog/editableBlog';
import UpdateBlogEditor from '../components/UpdateBlogEditor';
import UpdateBlogInputs from '../components/UpdateblogInputs';

import { GridLoader } from 'react-spinners';
import { updatecreatedBy, updatecreatedDate, updateStatus } from '../redux/blog/blogSlice';
function UpdateBlog() {

  
  const editorRef = React.useRef();
  const { status, content } = useSelector((state) => state.editableblog);
  const editorBlogData = useSelector((state) => state.editableblog);
  const dispatch = useDispatch();
  const { blog_id } = useParams();
  const [loaderVisible, setLoaderVisible] = useState(false);

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
        dispatch(updtaeEditableTitle(resData.data.title));
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
        dispatch(updateEditableByLine(resData.data.by_line));
        dispatch(updateEditableEditedBy(resData.data.edited_by));
        dispatch(updateEditablePublishedBy(resData.data.published_by));
        let contentData = JSON.parse(resData.data.content);
        dispatch(updateEditableContent(contentData));
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogData();
  }, [blog_id]);

 let saveBlog = async () => {
  const editorState = await editorRef.current.save();
  const updatedBy = window.localStorage.getItem('userid');
  const updatedDate = getCurrentDatetimeString();
  const updatedContent = JSON.stringify(editorState);

  setLoaderVisible(true);

  setTimeout(async () => {
    const updatedData = {
      ...editorBlogData,
      updated_by: updatedBy,
      updated_at: updatedDate,
      updated_content: updatedContent,
    };

    console.log("Final Payload", updatedData);

    const headers = new Headers();
    headers.append("Content-type", 'application/json');

    const reqOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(updatedData),
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/story/save`, reqOptions);
      const resData = await res.json();
      if (res.status === 400) {
        alert(resData.msg.toUpperCase());
        return;
      }
      alert("Post Save");
    } catch (error) {
      console.error(error);
    } finally {
      setLoaderVisible(false);
    }
  }, 2000);
};


  const publishBlog = async () => {
    const url= `${process.env.REACT_APP_BASE_URL}/story/publish/${blog_id}`;
    const res= await fetch(url);
    const resData = await res.json();
    if (res.status === 400 || res.status === 404 || res.status === 500) {
      alert(resData.msg.toUpperCase());
      return;
    }else {
      alert("Blog Published Successfully");
      dispatch(updateEditableStatus("published"));
    }
  }
  const unpublishBlog = async () => {
    const url= `${process.env.REACT_APP_BASE_URL}/story/unpublish/${blog_id}`;
    const res= await fetch(url);
    const resData = await res.json();
    if (res.status === 400 || res.status === 404 || res.status === 500) {
      alert(resData.msg.toUpperCase());
      return;
    }else {
      alert("Blog Unpublished Successfully");
      dispatch(updateEditableStatus("draft"));
    }
  }
  return (

    <div className='blog-container'>
      <div className='editor-button-groups'>
        <button onClick={saveBlog}>Save</button>
        {console.log(status)}
        {status && (status === "draft" ? <button onClick={publishBlog}>Publish</button> : <button onClick={unpublishBlog}>Unpublish</button>)}

      </div>
      <div className='blog-editor-container'>
        {content?.blocks?.length > 0 && (
          <UpdateBlogEditor editorRef={editorRef} />
        )}
      </div>
      <div className='blog-data-container'>
        <UpdateBlogInputs loaderSetter={setLoaderVisible} />
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