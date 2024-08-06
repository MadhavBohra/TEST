'use client';

import React from 'react';
import Link from 'next/link';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
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
        <img className="bell" src="/bell.png" alt="Notifications" />
        <Link href='/UserDetailEditForm'><img className='settings' src='/settings.png' alt='Settings'/></Link>
        <Link href='/UserDashboard'><img className="avatar" src="/avataricon.png" alt="User Avatar" /></Link>
      </div>
    </header>
  );
};

export default Header;
