import Sidebar from '../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import Dashboard from './Dashboard'
import Image from './Image'
import Video from './Video'
function HomePage() {
  const {component}=useSelector((state)=>state.pageRenders)
  console.log(component)
  return (
    <>
    <Sidebar/>
    {component ==="dashboard" && <Dashboard/>}
    {component ==="allimages" && <Image/>}
    {component ==="allvideos" && <Video/>}
    </>
  )
}

export default HomePage