import { useDispatch } from "react-redux";


export const fetchStoriesForCMS=async()=>{
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/story/get/cms/dashboard`);
        const data = await response.json();
        
    } catch (error) {
        console.log(error);   
    }


}