import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor';
import { useState } from 'react';
import BlogEditor from './pages/BlogEditor';
import HomePage from './pages/HomePage';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import UpdateBlog from './pages/UpdateBlog';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/new/story' element={<div className="editor"><BlogEditor/></div>}/>
        <Route path='/update/story/:blog_id' element={<UpdateBlog/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
