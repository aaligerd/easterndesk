import React from 'react'
import '../style/Maincontainer.css';
import '../style/Dashboard.css';
import { dashboardtopbutton } from '../utils/DashboardButton'
import { useDispatch, useSelector } from 'react-redux';
import { updateDashboardTab } from '../redux/dashboardButton/dashboardSlice'; 
import Story from '../components/Stories/Story';
import { updateIsLogin, updateUserId, updateUsername } from '../redux/user/userSlice';
function Dashboard() {

  const {component}=useSelector((state)=>state.dashboardTab)
  const dispatch=useDispatch();
  const logout=()=>{
    window.localStorage.removeItem("islogin");
    window.localStorage.removeItem("username");
    dispatch(updateIsLogin(false))
    dispatch(updateUsername(""));
    dispatch(updateUserId(""));

  }

  return (
    <div className='main-contianer'>
      <div className='top-button-container'>
        {dashboardtopbutton?.map((ele, index) => {
          return (
            <div className='button-container' key={index}><button onClick={(e)=>{dispatch(updateDashboardTab(ele.toLocaleLowerCase()))}}>{ele}</button></div>
          )
        })}
      </div>
      <div>
        {component==="stories" && <Story/>}
        {component==="liveblog" && <p>LiveBLog</p>}
        {component==="analytics" && <p>Analytics</p>}
      </div>
    </div>
  )
}

export default Dashboard