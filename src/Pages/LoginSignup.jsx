import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    const url = "http://localhost:4000/login";

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    const url = "http://localhost:4000/signup";

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const changeHandler = async (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };


  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state === "login" ? "Login" : "Sign Up"}</h1>

        <div className="loginsignup-fields">
          {
          state === "signup" && 
          <input type="text" name="username" placeholder="Your Name" value={formData.username} onChange={changeHandler} required />
          }
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={changeHandler} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={changeHandler} required />
          <button type="submit" onClick={() =>(state === 'login' ? login() : signup())}>Continue</button>
        </div>
     
        {state === "login" ? (<p className="loginsignup-login">   Create an account?{" "}<span onClick={() => setState("signup")}>Click Here</span></p>
        ) : (<p className="loginsignup-login">Already have an account?{" "}<span onClick={() => setState("login")}>Login Here</span></p>)}

        {state === "signup" && (
          <div className="loginsignup-agree">
            <input type="checkbox" name="terms" id="terms" checked={formData.terms} onChange={changeHandler} required />
            <label htmlFor="terms">By continuing, I agree to the terms of use & privacy policy</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
