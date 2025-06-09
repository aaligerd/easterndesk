import React from 'react'
import { RxCross2 } from "react-icons/rx";
import '../style/Lable.css';

function Lable({data,deletLable,index_no}) {
  return (
    <div className='lable-content'>
        <p>{data}</p>
        <div onClick={(e)=>{deletLable(index_no)}}>
            <RxCross2 />
        </div>
    </div>
  )
}

export default Lable