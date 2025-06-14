import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { menuitems } from './SidebarContent';
import { updatePageRenders } from '../../redux/pageRenders/pageSlice';


function Sidebar() {
    const{username}=useSelector((state)=>state.activeUser);
    const dispatch=useDispatch();
    const openNewBlogPage=()=>{
        window.open('/new/story','blank');
    }
  return (
    <div className='sidebar-container'>
        <div className='sidebar-header'>
            <div><h3>EasternDesk</h3></div>
        </div>
        <div className='sidebar-header'>
            <h4>{`Hi ${username}`}</h4>
        </div>
        <div className='menu-item-container'> 
            {menuitems?.map((ele,index)=>{
                if(ele.component==='newblog'){
                    return <div className='menu-item' onClick={()=>{openNewBlogPage()}} key={index}>
                <div className='menu-icon'>
                    {ele.icon}
                </div>
                <div className='menu-text'>
                    <p>{ele.text}</p>
                </div>
            </div>
                }
                return <div className='menu-item' onClick={()=>{dispatch(updatePageRenders(ele.component))}} key={index}>
                <div className='menu-icon'>
                    {ele.icon}
                </div>
                <div className='menu-text'>
                    <p>{ele.text}</p>
                </div>
            </div>
            })}
            
        </div>
        
    </div>
  )
}

export default Sidebar