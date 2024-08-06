'use client';  // This directive ensures the file is treated as a client-side script in Next.js.

// Import necessary React hooks and components
import React, { useState, useEffect } from "react";
import { StoreProvider } from "../StoreProvider";  // Import a custom store provider component.
import Link from "next/link";  // Import Link component from Next.js for client-side navigation.
import styles from "./LandingPage.module.css";  // Import CSS module for styling the component.
import LandingHeader from "../components/LandingHeader/Header";  // Import the LandingHeader component.
import UserDashboardHeader from "../components/UserDashboardHeader/Header";  // Import the UserDashboardHeader component.

// Function to load authentication state from localStorage
const loadAuthState = () => {
  try {
    // Try to get the 'token' from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // If token exists, return authenticated state with the token
      return { authenticated: true, token: storedToken };
    } else {
      // If no token, return unauthenticated state
      return { authenticated: false, token: '' };
    }
  } catch (error) {
    // Log any errors accessing localStorage and return unauthenticated state
    console.error('Error accessing localStorage:', error);
    return { authenticated: false, token: '' };
  }
};

// Define a functional component HeaderComponent
const HeaderComponent = () => {
  // Use React's useState hook to manage authentication state
  const [authState, setAuthState] = useState({ authenticated: false, token: '' });

  // Use React's useEffect hook to perform side effects
  useEffect(() => {
    // Load authentication state when the component mounts
    const state = loadAuthState();
    setAuthState(state);

    // Define a function to handle 'beforeunload' event
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');  // Remove token from localStorage when the page is about to unload
    };

    // Add event listener for 'beforeunload' event
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);  // Empty dependency array ensures this effect runs only once on mount

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setAuthState({ authenticated: false, token: '' });  // Update authentication state to unauthenticated
  };

  // Render the header component conditionally based on authentication state
  return (
    <div className={styles.headercomp}>
      {!authState.authenticated ? <LandingHeader /> : <UserDashboardHeader />}
    </div>
  );
};

// Define the main functional component LandingPage
export default function LandingPage() {
  // Render the main layout and components of the landing page
  return (
    <StoreProvider>  {/* Provide store context to the application */}
      <div className={styles.background}>  {/* Apply background style */}
        <HeaderComponent />  {/* Include the header component */}
        <div className={styles.container}>  {/* Apply container style */}
          <p className={styles.t1}>AI Curated corporate wellness program</p>  {/* Display text */}
          <p className={styles.t2}>MyEasyPharma</p>  {/* Display text */}
          <Link href='/SignUp'><button className={styles.b1}>Get started for free</button></Link>  {/* Link to SignUp page */}
          <Link href='/OurServices'><button className={styles.b2}>&#x25BC; Our Services</button></Link>  {/* Link to OurServices page */}
        </div>
      </div>
    </StoreProvider>
  );
}
