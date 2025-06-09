import React, { useRef } from 'react'
import Lable from './Lable';
import '../style/BlogInput.css'
import { useSelector, useDispatch } from 'react-redux';
import { addEditableLables, removeEditableLables, updateEditableCategory, updateEditableSeoDescription, updateEditableSeoHeadline, updateEditableSeoKeywords, updateEditableSeoTitle, updateEditableSeoUrl, updateEditableSeoURLSlug, updateEditableSubategory, updateEditableThumbnail, updtaeEditableTitle } from '../redux/editableBlog/editableBlog.js';
function UpdateBlogInputs() {
    const { title,category, subcategory, lables, seo_title, seo_desc, seo_keywords, seo_url, thumbnail,seo_headline,seo_url_slug } = useSelector((state) => state.editableblog);
    const dispatch = useDispatch();
    const lableInputRef = useRef();

    const addLableInLableList = () => {
        const currentLabelInput = lableInputRef.current.value.trim();
        if (!currentLabelInput) return;
        dispatch(addEditableLables(currentLabelInput))
        lableInputRef.current.value = "";
    }

    const deleteLableInLableList = (index) => {
        dispatch(removeEditableLables(index));
    }

    return (
        <div className='form-container'>
            <div className='blog-desc-section'>
                <div className='input-field-container'>
                    <lable htmlFor="title">Title</lable>
                    <input type="text" value={title} id='title' onChange={(e) => { dispatch(updtaeEditableTitle(e.target.value)) }} />
                </div>
                <div className='input-field-container'>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={category} onChange={(e) => { dispatch(updateEditableCategory(e.target.value)) }}>
                        <option value="">Select Category</option>
                        <option value='15001'>Sports</option>
                    </select>
                </div>
                <div className='input-field-container'>
                    <label htmlFor="subcategory">Subcategory</label>
                    <select name="subcategory" id="subcategory" value={subcategory} onChange={(e) => { dispatch(updateEditableSubategory(e.target.value)) }}>
                        <option value="">Select Subcategory</option>
                        <option value='16001'>Cricket</option>
                    </select>
                </div>
                <div className='input-field-container' id='lable-section'>
                    <div>
                    <label htmlFor="lables">Lables</label>
                    <input type="text" list='lable-list' ref={lableInputRef} />
                    <datalist id='lable-list'>
                        <option>Lable 1</option>
                        <option>Lable 2</option>
                        <option>Lable 3</option>
                        <option>Lable 4</option>
                        <option>Lable 5</option>
                    </datalist>
                    <button onClick={addLableInLableList}>Add Lable</button>
                    </div>
                    <div className='lable-container'>
                        {lables && lables.map((ele, index) => (
                            <Lable key={index} data={ele} deletLable={deleteLableInLableList} index_no={index} />
                        ))}
                    </div>

                </div>
            </div>
            <div className='blog-seo-section'>
                <div className='input-field-container'>
                    <label htmlFor="seo-title">SEO Title</label>
                    <input type="text" value={seo_title} id='seo_title' onChange={(e) => { dispatch(updateEditableSeoTitle(e.target.value)) }} />
                </div>
                <div className='input-field-container'>
                    <label htmlFor="seo_headline">SEO Headline</label>
                    <input type="text" value={seo_headline} id='seo_headline' onChange={(e) => { dispatch(updateEditableSeoHeadline(e.target.value)) }} />
                </div>
                <div className='input-field-container'>
                    <label htmlFor="seo-desc">SEO Description</label>
                    <textarea type="text" value={seo_desc} id='seo-desc' onChange={(e) => { dispatch(updateEditableSeoDescription(e.target.value)) }} />
                </div>
                <div className='input-field-container'>
                    <label htmlFor="seo-keywords">SEO Keywords</label>
                    <input type="text" value={seo_keywords} id='seo-keywords' onChange={(e) => { dispatch(updateEditableSeoKeywords(e.target.value)) }} />
                </div>
                <div className='input-field-container'>
                    <label htmlFor="seo-url">SEO URL</label>
                    <input type="text" value={seo_url} id='seo-url' onChange={(e) => { dispatch(updateEditableSeoUrl(e.target.value));dispatch(updateEditableSeoURLSlug(e.target.value)) }} />
                </div>
                <div className='input-field-container'>
                    <p>{`${process.env.REACT_APP_CONSUMER_URL}/category/subcategory/${seo_url_slug}`}</p>
                </div>
                <div className='input-field-container'>
                    <label htmlFor="thumbnail">Thumbnail URL</label>
                    <input type="text" value={thumbnail} id='thumbnail' onChange={(e) => { dispatch(updateEditableThumbnail(e.target.value)) }} />
                </div>
            </div>
        </div>
    )
}

export default UpdateBlogInputs