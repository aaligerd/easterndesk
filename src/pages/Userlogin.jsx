import React, { useEffect } from "react";
import "../style/Userlogin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsLogin,
  updateUserId,
  updateUsername,
} from "../redux/user/userSlice";
function Userlogin() {
  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObjects = Object.fromEntries(formData);
    window.localStorage.setItem("username", formObjects.username);
    window.localStorage.setItem("islogin", true);
    dispatch(updateIsLogin(true));
    dispatch(updateUsername("TestUsername"));
    dispatch(updateUserId("TEST1001"));
  };

  return (
    <div className="login-form-container">
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={userLogin} className="login-form">
        <h3>EasternDesk</h3>
        <label for="username" className="form-lable">
          Username
        </label>
        <input
          type="text"
          placeholder=""
          id="username"
          name="username"
          required
          className="form-input"
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
    </div>
  );
}

export default Userlogin;
