import { useDispatch, useSelector } from 'react-redux'
import Userlogin from './Userlogin'
import UserHomepage from './UserHomepage'
import { useEffect } from 'react'
import { updateIsLogin, updateUserId, updateUsername } from '../redux/user/userSlice'
function HomePage() {
  const {islogin}=useSelector((state)=>state.activeUser);
  const dispatch=useDispatch();
  useEffect(()=>{
    let islogin=window.localStorage.getItem('islogin');
    let userid=window.localStorage.getItem('userid')
    let username=window.localStorage.getItem('username');
    if(islogin && userid && username){
      dispatch(updateIsLogin(true));
      dispatch(updateUsername(username));
      dispatch(updateUserId(userid));
    }
  },[])
  return (
    <>
    {islogin===true?<UserHomepage/>:<Userlogin/>}
    </>
  )
}

export default HomePage