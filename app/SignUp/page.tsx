'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import './SignUp.css';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [consentChecked, setConsentChecked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('https://mep-web-front-and-back-6.onrender.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        localStorage.setItem('token', result.token);
        window.location.href = result.redirectTo || '/LoginPage';
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  // Update state as user types
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
    setFormValid(value !== '' && email !== '' && password !== '' && consentChecked);
  };

  // Update state as user types
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setFormValid(value !== '' && username !== '' && password !== '' && consentChecked);
  };

  // Update state as user types
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setFormValid(username !== '' && email !== '' && value !== '' && consentChecked);
  };

  // Toggle show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle checkbox change
  const handleConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConsentChecked(event.target.checked);
    setFormValid(username !== '' && email !== '' && password !== '' && event.target.checked);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <img src='/logo.png' alt="Logo" className="logo" /> {/* Use the imported logo image */}
        <h2>Welcome To MyEasyPharma</h2>
        <h4>Already have an account? <a href="./LoginPage" className="LogIn">Log In</a></h4>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            placeholder='Email'
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>Username</label>
          <input
            placeholder='Username'
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label>Password</label>
          <div className="password-input">
            <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <img
              src='/eye.png'
              alt={showPassword ? 'Hide' : 'Show'}
              className="eye-icon"
              onClick={toggleShowPassword}
            />
          </div>
          <ul className='Pwdconditions'>
            <li>Use 8 or more characters, one uppercase character, one uppercase character & one lowercase character</li>
            <li>Use one special character & one number</li>
          </ul>
          <div className="consent-checkbox-wrapper">
            <input
              placeholder='checkbox'
              name='consumer'
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={handleConsentChange}
            /><label htmlFor="consent">
              I want to receive emails about the products, feature updates, events and marketing promotions.
            </label>
          </div>
          <h6>By creating an account, you agree to the <a href="/Terms" className="Terms">Terms of use</a> and <a href="/PrivacyPolicy" className="PrivacyPolicy">Privacy Policy</a>.</h6>
          <button type="submit" className="create-acc-btn" disabled={!formValid}>Create Account</button>
          <div className="or-separator">
            <span className="line"></span>
            <span className="or-text">OR</span>
            <span className="line"></span>
          </div>
          <button className="google-btn">
            <FaGoogle className="icon" /> Sign Up with Google
          </button>
          <button className="facebook-btn">
            <FaFacebook className="icon" /> Sign Up with Facebook
          </button>
        </form>
      </div>
      <div className="image-container">
        <img src='/GreenBGRight.png' alt="Side" /> {/* Use the imported side image */}
      </div>
    </div>
  );
};

export default LoginForm;