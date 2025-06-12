import Sidebar from '../components/Sidebar/Sidebar'
import '../style/UserHomepage.css';
import React, { useState } from 'react'
import Dashboard from './Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import Image from './Image'
import Video from './Video'
import { updateIsLogin, updateUserId, updateUsername } from '../redux/user/userSlice'
import { GridLoader } from 'react-spinners';

function UserHomepage() {
    const {component}=useSelector((state)=>state.pageRenders);
    const dispatch=useDispatch();
      const [loaderVisible, setLoaderVisible] = useState(false);
    
    const logout=()=>{
        setLoaderVisible(true)
        window.localStorage.removeItem("islogin");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("userid");
        dispatch(updateIsLogin(false))
        dispatch(updateUsername(""));
        dispatch(updateUserId(""));
        setLoaderVisible(false);
      }
  return (
    <>
    <Sidebar/>
    <div className='logout-btn-container'>
          <button onClick={logout}>Logout</button>
      </div>
    {component ==="dashboard" && <Dashboard/>}
    {component ==="allimages" && <Image/>}
    {component ==="allvideos" && <Video/>}
    <div className='loading-container'>
        <GridLoader
          color="#767676"
          loading={loaderVisible}
          margin={10}
          size={20}
        />
      </div> 
    </>
  )
}

export default UserHomepage