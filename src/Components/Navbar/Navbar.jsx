<<<<<<< HEAD
import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '.././Assets/nav_menu.png'


const Navbar = () => {
  const {getTotalCartItems} =useContext(ShopContext);
  const [menu, setMenu] = useState("shop");
  const menuRef = useRef();

  const dropdown_toggle = (e)=>{
    menuRef.current.classList.toggle("nav-menu-visible")
    e.target.classList.toggle("open")


  }
  return (
    <div className='navbar'>
       <img className = "nav-dropdown" onClick = {dropdown_toggle} src={nav_dropdown} alt="" />
=======
import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_menu.png';

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [menu, setMenu] = useState("shop");
  const menuRef = useRef();
  const location = useLocation();

  // Set initial menu state based on the current path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/mens") {
      setMenu("mens");
    } else if (path === "/womens") {
      setMenu("womens");
    } else if (path === "/kids") {
      setMenu("kids");
    } else {
      setMenu("shop");
    }
  }, [location.pathname]);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className='navbar'>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
>>>>>>> deployment-cofig-ec2
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>ABTrends</p>
      </div>
<<<<<<< HEAD
     
      <ul ref= {menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to="/" className='nav-link'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu('mens')}}><Link to="/mens" className='nav-link'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu('womens')}}><Link to="/womens" className='nav-link'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu('kids')}}><Link to="/kids" className='nav-link'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to = '/login'><button>Login</button></Link>
        <Link to = '/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
      
    </div>
  )
}

export default Navbar
=======

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop"); }}><Link to="/" className='nav-link'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu('mens'); }}><Link to="/mens" className='nav-link'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu('womens'); }}><Link to="/womens" className='nav-link'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu('kids'); }}><Link to="/kids" className='nav-link'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Log out</button>
          : <Link to='/login'><button>Login</button></Link>}
        
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
>>>>>>> deployment-cofig-ec2
