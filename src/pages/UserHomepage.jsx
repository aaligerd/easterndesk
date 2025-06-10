import Sidebar from '../components/Sidebar/Sidebar'
import '../style/UserHomepage.css';
import React from 'react'
import Dashboard from './Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import Image from './Image'
import Video from './Video'
import { updateIsLogin, updateUserId, updateUsername } from '../redux/user/userSlice'

function UserHomepage() {
    const {component}=useSelector((state)=>state.pageRenders);
    const dispatch=useDispatch();
    const logout=()=>{
        window.localStorage.removeItem("islogin");
        window.localStorage.removeItem("username");
        dispatch(updateIsLogin(false))
        dispatch(updateUsername(""));
        dispatch(updateUserId(""));
    
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
    </>
  )
}

export default UserHomepage