import React, { use, useEffect, useRef, useState } from "react";
import Lable from "./Lable";
import "../style/BlogInput.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  updateSubcategory,
  addLables,
  removeLables,
  updateSeoTitle,
  updateSeoDesc,
  updateSeoKeyWords,
  updateSeoURL,
  updateSeoThumbnail,
  updateTitle,
  updateSeoHeadline,
  updateSeoURLSlug,
} from "../redux/blog/blogSlice.js";
function BlogInputs({loaderSetter}) {
  const imagesrc = useRef();
  const imageFile = useRef();
  const {
    title,
    category,
    subcategory,
    lables,
    seo_title,
    seo_desc,
    seo_keywords,
    seo_url,
    thumbnail,
    seo_headline,
    seo_url_slug,
  } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const lableInputRef = useRef();
  const [caregories, setCategories] = React.useState([]);
  const [subcaregories, setSubcategories] = React.useState([]);
  const [lableList, setLablelist] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const urlCategory = `${process.env.REACT_APP_BASE_URL}/story/get/list/category/`;
    const urlSubcategory = `${process.env.REACT_APP_BASE_URL}/story/get/list/subcategory/`;
    const fetchCategories = async () => {
      const res = await fetch(urlCategory);
      const resData = await res.json();
      console.log(resData);
      setCategories(resData.data);
    };
    const fetchSubategories = async () => {
      const res = await fetch(urlSubcategory);
      const resData = await res.json();
      setSubcategories(resData.data);
    };
    fetchCategories();
    fetchSubategories();
  }, []);

  const addLableInLableList = () => {
    const currentLabelInput = lableInputRef.current.value.trim();
    if (!currentLabelInput) return;
    dispatch(addLables(currentLabelInput));
    setSearchText("");
  };

  const deleteLableInLableList = (index) => {
    dispatch(removeLables(index));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim() !== "") {
        fetchLabels(searchText);
      } else {
        setLablelist([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const fetchLabels = async (word) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/lables/get/${word}`
      );
      const response = await res.json();
      console.log(response.data);
      setLablelist(response.data);
    } catch (err) {
      console.error("Error fetching labels:", err);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const uploadThumbnail = async () => {
    loaderSetter(true);
    const file = imageFile.current.files[0];
    if (!file) {
      alert("Please select a file");
      loaderSetter(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    const url = `${process.env.REACT_APP_BASE_URL}/uploadFile`;
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const response=await res.json();
      dispatch(updateSeoThumbnail(response.file.url));
    } catch (error) {
        console.log(error)
    }
    finally{
        loaderSetter(false);
    }
  };
  useEffect(()=>{
    imagesrc.current.src=thumbnail;
  },[thumbnail])

  return (
    <div className="form-container">
      <div className="blog-desc-section">
        <div className="input-field-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={(e) => {
              dispatch(updateTitle(e.target.value));
            }}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => {
              dispatch(updateCategory(e.target.value));
            }}
          >
            <option value="">Select Subcategory</option>
            {caregories.map((category, index) => (
              <option key={index} value={category.category_id}>
                {category.name.substr(0, 1).toUpperCase() +
                  category.name.substr(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="input-field-container">
          <label htmlFor="subcategory">Subcategory</label>
          <select
            name="subcategory"
            id="subcategory"
            value={subcategory}
            onChange={(e) => {
              dispatch(updateSubcategory(e.target.value));
            }}
          >
            <option value="">Select Subcategory</option>
            {subcaregories.map((subcategory, index) => (
              <option key={index} value={subcategory.subcategory_id}>
                {subcategory.name.substr(0, 1).toUpperCase() +
                  subcategory.name.substr(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="input-field-container" id="lable-section">
          <div>
            <label htmlFor="lables">Lables</label>
            <input
              type="text"
              list="lable-list"
              ref={lableInputRef}
              onChange={handleInputChange}
              value={searchText}
            />
            <datalist id="lable-list">
              {lableList.map((item, index) => (
                <option key={index}>{item.lable_name}</option>
              ))}
            </datalist>
            <button onClick={addLableInLableList}>Add Lable</button>
          </div>
          <div className="lable-container">
            {lables &&
              lables.map((ele, index) => (
                <Lable
                  key={index}
                  data={ele}
                  deletLable={deleteLableInLableList}
                  index_no={index}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="blog-seo-section">
        <div className="input-field-container">
          <label htmlFor="seo-title">SEO Title</label>
          <input
            type="text"
            value={seo_title}
            id="seo_title"
            onChange={(e) => {
              dispatch(updateSeoTitle(e.target.value));
            }}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="title">SEO Headline</label>
          <input
            type="text"
            value={seo_headline}
            id="seo_title"
            onChange={(e) => {
              dispatch(updateSeoHeadline(e.target.value));
            }}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="seo-desc">SEO Description</label>
          <textarea
            type="text"
            value={seo_desc}
            id="seo-desc"
            onChange={(e) => {
              dispatch(updateSeoDesc(e.target.value));
            }}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="seo-keywords">SEO Keywords</label>
          <input
            type="text"
            value={seo_keywords}
            id="seo-keywords"
            onChange={(e) => {
              dispatch(updateSeoKeyWords(e.target.value));
            }}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="seo-url">SEO URL</label>
          <input
            type="text"
            value={seo_url}
            id="seo-url"
            onChange={(e) => {
              dispatch(updateSeoURL(e.target.value));
              dispatch(updateSeoURLSlug(e.target.value));
            }}
          />
        </div>
        <div className="input-field-container">
          <p>{`${process.env.REACT_APP_CONSUMER_URL}/category/subcategory/${seo_url_slug}`}</p>
        </div>
        <div className="input-field-container">
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            type="file"
            // value={thumbnail}
            id="thumbnail"
            ref={imageFile}
            // onChange={(e) => {
            //   dispatch(updateSeoThumbnail(e.target.value));
            // }}
          />
          <button type="button" onClick={uploadThumbnail}>
            Upload
          </button>
        </div>
        <div className="thumbnail-image-cintainer">
          <img src="" ref={imagesrc} />
        </div>
      </div>
    </div>
  );
}

export default BlogInputs;
