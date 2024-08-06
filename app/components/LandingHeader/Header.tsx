'use client';

import React from 'react';
import Link from 'next/link';
import './Header.css'; 
import { useState,useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <a href='/LandingPage'><img src="/logo.png" alt="Logo" /></a>
      </div>
      <nav className="nav-links">
        <a href='/LandingPage'>Home</a>
        <span>/</span>
        <a href="/AboutUs">About Us</a>
        <span>/</span>
        <a href="/Blogs">Blogs</a>
        <span>/</span>
        <a href="/FAQs">FAQs</a>
        <span>/</span>
        <a href="/ContactUs">Contact</a>
        <span>/</span>
        <img className="icon" src="/search.png" alt="Search" />
      </nav>
      <div className="icons">
        <a href='/SignUp' className="bell"><button className='signup'>SignUp</button></a>
        <a href='/LoginPage' className="avatar"><button className='login'>Login</button></a>
      </div>
    </header>
  );
};

export default Header;
