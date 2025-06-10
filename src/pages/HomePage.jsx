import { useDispatch, useSelector } from 'react-redux'
import Dashboard from './Dashboard'
import Image from './Image'
import Video from './Video'
import Userlogin from './Userlogin'
import UserHomepage from './UserHomepage'
import { useEffect } from 'react'
import { updateIsLogin } from '../redux/user/userSlice'
function HomePage() {
  const {islogin}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  useEffect(()=>{
    let islogin=window.localStorage.getItem('islogin');
    if(islogin){
      dispatch(updateIsLogin(true));
    }
  })
  return (
    <>
    {islogin===true?<UserHomepage/>:<Userlogin/>}
    </>
  )
}

export default HomePage