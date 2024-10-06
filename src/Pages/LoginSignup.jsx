<<<<<<< HEAD
import React from 'react'
import'./CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type='text' placeholder='Your Name'/>
          <input type='email' placeholder='Email Address'/>
          <input type='password' placeholder='Password'/>
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Already Have an account? <span>Login Here</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id = "" />
          <p>By continuing, i agree to the terms od use & privacy policy</p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginSignup
=======
import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import Api from "../Api/Api"; // Import URLs from Api.js

const LoginSignup = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
  });

  const login = async () => {
    console.log("Login Function Executed", formData);
    const responseData = await fetch(Api.login, { // Use imported URL
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json());

    if (responseData?.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData?.errors || "An error occurred");
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    const responseData = await fetch(Api.signup, { // Use imported URL
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json());

    if (responseData?.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData?.errors || "An error occurred");
    }
  };

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(updatedFormData);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state === "login" ? "Login" : "Sign Up"}</h1>

        <div className="loginsignup-fields">
          {state === "signup" && (
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={formData.username}
              onChange={changeHandler}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={changeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
            required
          />
          <button type="button" onClick={() => (state === 'login' ? login() : signup())}>
            Continue
          </button>
        </div>

        {state === "login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("signup")}>Click Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("login")}>Login Here</span>
          </p>
        )}

        {state === "signup" && (
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={formData.terms}
              onChange={changeHandler}
              required
            />
            <label htmlFor="terms">
              By continuing, I agree to the terms of use & privacy policy
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
>>>>>>> deployment-cofig-ec2
