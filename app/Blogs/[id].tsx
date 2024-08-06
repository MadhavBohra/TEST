'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header/Header';
import UserDashboardHeader from "../components/UserDashboardHeader/Header";
import LandingHeader from "../components/LandingHeader/Header";
import './Blog.css';

interface Blog {
  id: number;
  title: string;
  content: string;
  images: string[];
}

const loadAuthState = () => {
  try {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      return { authenticated: true, token: storedToken };
    } else {
      return { authenticated: false, token: '' };
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return { authenticated: false, token: '' };
  }
};

const HeaderComponent = () => {
  const [authState, setAuthState] = useState({ authenticated: false, token: '' });

  useEffect(() => {
    const state = loadAuthState();
    setAuthState(state);

    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthState({ authenticated: false, token: '' });
  };

  return (
    <div>
      {!authState.authenticated ? <LandingHeader /> : <UserDashboardHeader />}
    </div>
  );
};

const Blog: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      fetch('/blogs.json')
        .then(response => response.json())
        .then(data => {
          const blogData = data.find((blog: Blog) => blog.id === parseInt(id as string, 10));
          setBlog(blogData);
        })
        .catch(error => console.error('Error fetching blog data:', error));
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <>
      <HeaderComponent />
      <div className="blog-container">
        <h1>{blog.title}</h1>
        <div className="blog-content">
          <p>{blog.content}</p>
          {blog.images.map((image, i) => (
            <img key={i} src={image} alt={`Image ${i + 1}`} className="blog-image" />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
