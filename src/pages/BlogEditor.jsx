import { useRef, useEffect } from 'react'
import '../style/BlogEditor.css';
import Editor from '../components/Editor';
import BlogInputs from '../components/BlogInputs';
import { updateContent, updatecreatedBy, updatecreatedDate, updateStatus } from '../redux/blog/blogSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDatetimeString } from '../utils/GetDateStructure.js'

function BlogEditor() {
  const editorRef = useRef();
  const { content } = useSelector((state) => state.blog);
  const blogData = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  
  let saveBlogAsDraft = async () => {
    const editorState = await editorRef.current.save();
    window.localStorage.setItem('currentEditorstate', JSON.stringify(editorState));
    //update the content of blog.content
    dispatch(updatecreatedBy("ED10001"));
    dispatch(updatecreatedDate(getCurrentDatetimeString()));
    dispatch(updateContent(JSON.stringify(editorState)));
    dispatch(updateStatus("draft"));
    setTimeout(() => {
      const headers = new Headers();
      headers.append("Content-type", 'application/json')
      const reqOptions = { method: "POST", headers, body: JSON.stringify(blogData) }
      const saveData = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/story/create`, reqOptions);
          const resData=await res.json();
          if(res.status===400){
            alert(resData.msg.toUpperCase());
            return;
          }
          alert("Post Save as Draft");
          
        } catch (error) {
          console.log(error)
        }
      }
      saveData();
    }, 1000)
  };
;

  return (
    <div className='blog-container'>
      <div className='editor-button-groups'>
        <button onClick={saveBlogAsDraft}>Save</button>
        <button>Publish</button>
      </div>
      <div className='blog-editor-container'>
        <Editor editorRef={editorRef} />
      </div>
      <div className='blog-data-container'>
        <BlogInputs />
      </div>
      <div className='footer'>
        <h3>EasternDesk</h3>
      </div>
    </div>
  )
}

export default BlogEditor