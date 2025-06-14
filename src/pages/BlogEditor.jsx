import { useRef, useEffect, useState } from 'react'
import '../style/BlogEditor.css';
import Editor from '../components/Editor';
import BlogInputs from '../components/BlogInputs';
import { updateBlogId, updateContent, updatecreatedBy, updatecreatedDate, updateStatus } from '../redux/blog/blogSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDatetimeString } from '../utils/GetDateStructure.js'
import { GridLoader } from 'react-spinners';

function BlogEditor() {
  const editorRef = useRef();
  const lodingcontainer=useRef();
  const [loaderVisible, setLoaderVisible] = useState(false);
  const { content, blog_id,status } = useSelector((state) => state.blog);
  const { userid } = useSelector((state) => state.activeUser);
  const blogData = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  let saveBlogAsDraft = async () => {
    
    const editorState = await editorRef.current.save();
    let userid=window.localStorage.getItem('userid')
    setLoaderVisible(true)
    if (blog_id === -1) {
      dispatch(updateStatus("draft"));
      setTimeout(() => {
        const headers = new Headers();
        headers.append("Content-type", 'application/json');
        const payload={
          ...blogData,
          content: JSON.stringify(editorState),
          status: "draft",
          created_by:userid ,
          created_date: getCurrentDatetimeString(),
        };
        
        const reqOptions = { method: "POST", headers, body: JSON.stringify(payload) }
        console.log(reqOptions);
        const saveData = async () => {
          try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/story/create`, reqOptions);
            const resData = await res.json();
            if (res.status === 400) {
              alert(resData.msg.toUpperCase());
              return;
            } else {
              alert("Post Save as Draft");
              let newBlogId = resData.id;
              dispatch(updateBlogId(newBlogId));
            }

          } catch (error) {
            console.log(error)
          }finally{
            setLoaderVisible(false);
          }
        }
        saveData();
      }, 1000)
    } else {
      setTimeout(() => {
        const headers = new Headers();
        headers.append("Content-type", 'application/json')
        const payload = {
          ...blogData,
          updated_content: JSON.stringify(editorState),
          updated_by: "ED10001",
          updated_at: getCurrentDatetimeString(),
        };
        // console.log("Updated Payload",payload)
        const reqOptions = { method: "POST", headers, body: JSON.stringify(payload) }
        const saveData = async () => {
          try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/story/save`, reqOptions);
            const resData = await res.json();
            if (res.status === 400) {
              alert(resData.msg.toUpperCase());
              return;
            } else {
              alert("Post Save as Draft");
            }

          } catch (error) {
            console.log(error)
          }finally{
            setLoaderVisible(false);
          }
        }
        saveData();
      }, 1000)
    }
  };
    const publishBlog = async () => {
      if(blog_id === -1){
        alert("Please save the blog as draft before publishing.");
        return;
      }
      const url= `${process.env.REACT_APP_BASE_URL}/story/publish/${blog_id}`;
      const res= await fetch(url);
      const resData = await res.json();
      if (res.status === 400 || res.status === 404 || res.status === 500) {
        alert(resData.msg.toUpperCase());
        return;
      }else {
        alert("Blog Published Successfully");
        dispatch(updateStatus("published"));
      }
    }
    const unpublishBlog = async () => {
      if(blog_id === -1){
        alert("Please save the blog as draft before unpublishing.");
        return;
      }
      const url= `${process.env.REACT_APP_BASE_URL}/story/unpublish/${blog_id}`;
      const res= await fetch(url);
      const resData = await res.json();
      if (res.status === 400 || res.status === 404 || res.status === 500) {
        alert(resData.msg.toUpperCase());
        return;
      }else {
        alert("Blog Unpublished Successfully");
        dispatch(updateStatus("draft"));
      }
    }

  return (
    <div className='blog-container'>
      <div className='editor-button-groups'>
         <button onClick={saveBlogAsDraft}>Save</button>
        {status && (status === "draft" ? <button onClick={publishBlog}>Publish</button> : <button onClick={unpublishBlog}>Unpublish</button>)}
      </div>
      <div className='blog-editor-container'>
        <Editor editorRef={editorRef} />
      </div>
      <div className='blog-data-container'>
        <BlogInputs loaderSetter={setLoaderVisible} />
      </div>
      <div className='footer'>
        <h3>EasternDesk</h3>
      </div>
      <div className='loading-container' ref={lodingcontainer}>
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

export default BlogEditor