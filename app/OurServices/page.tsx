'use client';
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./OurServices.module.css";
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

const HealthWellness: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`${styles.healthWellness} ${className}`}>
      <h1 className={styles.ourServices1}>Our Services</h1>
      <div className={styles.employeeHealth}>
        <div className={styles.personalizedPlan}>
        <img
            className={styles.image9Icon}
            loading="lazy"
            alt=""
            src="/image-9@2x.png"
          />
          <div className={styles.personalizedPlanChild} />
          <div className={styles.planHeading}>
            <div className={styles.deliveringHealthAndContainer}>
              <p className={styles.deliveringHealthAnd}>
                Delivering Health and wellness by AYUSH
        
              </p>
              <p className={styles.byAyush}></p>
            </div>
          </div>
          <img
            className={styles.personalizedPlanItem}
            loading="lazy"
            alt="Arrow"
            src="/arrow-2.svg"
          />
        </div>
        <div className={styles.personalizedPlan1}>
        <img
            className={styles.image10Icon}
            loading="lazy"
            alt=""
            src="/image-10@2x.png"
          />
          <div className={styles.personalizedPlanInner} />
          <div className={styles.personalisedHealthPlan}>
            Personalised Health Plan for Employees!
          </div>
          <div className={styles.frameDiv}>
            <img
              className={styles.frameChild}
              loading="lazy"
              alt="Arrow"
              src="/arrow-2.svg"
            />
          </div>
        </div>
        <div className={styles.productiveCorporates}>
        <img
            className={styles.image11Icon}
            loading="lazy"
            alt=""
            src="/image-11@2x.png"
          />
          <div className={styles.corporateDescription}>
            <div className={styles.corporateDescriptionChild} />
            <div className={styles.enableProductiveHealthierWrapper}>
              <div className={styles.enableProductive}>
                Enable Productive & Healthier Corporates!
              </div>
            </div>
            <img
              className={styles.corporateDescriptionItem}
              loading="lazy"
              alt="Arrow"
              src="/arrow-2.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.socialContainer}>
        <div className={styles.socialIcons}>
          <img
            className={styles.socialIcon}
            loading="lazy"
            alt="Social Icon 1"
            src="/social.svg"
          />
          <img
            className={styles.socialIcon}
            loading="lazy"
            alt="Social Icon 2"
            src="/social-1.svg"
          />
          <img
            className={styles.socialIcon}
            loading="lazy"
            alt="Social Icon 3"
            src="/social-2@2x.png"
          />
          <img
            className={styles.socialIcon}
            loading="lazy"
            alt="Social Icon 4"
            src="/social-3@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

HealthWellness.propTypes = {
  className: PropTypes.string,
};

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

const HeaderComponent: React.FC = () => {
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
    <div className={styles.headercomp}>
      {authState.authenticated ? <UserDashboardHeader /> : <LandingHeader />}
    </div>
  );
};

const OurServices: React.FC = () => {
  return (
    <div className={styles.root}>
      <HeaderComponent />
      <div className={styles.ourServices}>
        <div className={styles.ourServicesChild} />
        <div className={styles.ourServicesItem} />
        <div className={styles.ourServicesInner} />
        <div className={styles.lineDiv} />
        <div className={styles.servicesContainer}>
          <div className={styles.loginContainer}>
            <div className={styles.loginField}>
            </div>
          </div>
        </div>
        <div className={styles.backgroundImage}>
          <img
            className={styles.backgroundPatternIcon}
            alt=""
            src="/Background.png"
          />
        </div>
        <HealthWellness />
      </div>
    </div>
  );
};

export default OurServices;
