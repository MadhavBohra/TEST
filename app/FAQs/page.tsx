"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header'; // Adjust the path as needed
import './FAQs.css'; // Ensure this file contains the styles for the FAQ page
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

interface FAQItemProps {
  question: string;
  answer: string;
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

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span className="icon">
          <img src={isOpen ? '/cross.png' : '/plus.png'} alt={isOpen ? "Close" : "Open"} />
        </span>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
      <hr />
    </div>
  );
};

const FAQs: React.FC = () => {
  const [faqData, setFaqData] = useState<FAQItemProps[]>([]);

  useEffect(() => {
    fetch('/faqs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setFaqData(data))
      .catch(error => console.error('Error fetching FAQ data:', error));
  }, []);

  return (
    <div>
      <HeaderComponent /> {/* Include the Header component */}
      <div className="faqs-container">
        <div className="intro-text">
          <h1>FAQs on Health and Wellness</h1>
          <h3>Explore our frequently asked questions to find answers on topics ranging from yoga poses and dietary charts to the benefits of specific foods and exercises. Gain insights into managing lifestyle diseases, improving fitness, and maintaining overall well-being.</h3>
        </div>
        {faqData.length > 0 ? (
          faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          <p>Loading FAQs...</p>
        )}
      </div>
    </div>
  );
};

export default FAQs;
