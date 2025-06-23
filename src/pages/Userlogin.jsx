import React, { useEffect, useState } from "react";
import "../style/Userlogin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsLogin,
  updateUserId,
  updateUsername,
} from "../redux/user/userSlice";
import { GridLoader } from "react-spinners";
function Userlogin() {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const dispatch = useDispatch();
  const userLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObjects = Object.fromEntries(formData);
    console.log(formObjects);
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    const url = `${process.env.REACT_APP_BASE_URL}/auth/login`;
    setLoaderVisible(true);
    try {
      const reqOption = {
        method: "POST",
        headers,
        body: JSON.stringify(formObjects),
      };
      const res = await fetch(url, reqOption);
      const data = await res.json();
      if (res.status === 200 && data.data && data.data.length > 0) {

        const userIdFromBackend = data.data[0]["editor_id"]; 
        const userNameFromBackend = data.data[0]["editor_name"];

        window.localStorage.setItem("userid", userIdFromBackend);
        window.localStorage.setItem("islogin", true);
        window.localStorage.setItem("username", userNameFromBackend);

        dispatch(updateIsLogin(true));
        dispatch(updateUsername(userNameFromBackend));
        dispatch(updateUserId(userIdFromBackend));
      } else {
        alert(data.msg);
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderVisible(false);
    }
  };

  return (
    <div className="login-form-container">
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={userLogin} className="login-form">
        <h3>EasternDesk</h3>
        <label for="userid" className="form-lable">
          UserID
        </label>
        <input
          type="text"
          placeholder=""
          id="userid"
          name="userid"
          required
          className="form-input"
          autoComplete="off"
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="form-input"
        />
        <button>Log In</button>
      </form>
      <div className="loading-container">
        <GridLoader
          color="#767676"
          loading={loaderVisible}
          margin={10}
          size={20}
        />
      </div>
    </div>
  );
}

export default Userlogin;
