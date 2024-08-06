'use client'

import React, { useState, useEffect, FunctionComponent } from "react";
//import classnames from "classnames";
import styles from "./AboutUs.module.css";
import LandingHeader from "../components/LandingHeader/Header";
import UserDashboardHeader from "../components/UserDashboardHeader/Header";

// Define the MissionContainer component within the AboutUs file
export type MissionContainerType = {
  className?: string;
};

const MissionContainer: FunctionComponent<MissionContainerType> = ({
  className = "",
}) => {
  return (
    <section className={(styles.missionContainer, className)}>
      <article className={styles.missionDetails}>
        <div className={styles.missionElaboration}>
          <section className={styles.missionScope}>
            <h2 className={styles.whatWeDo}>What We Do</h2>
            <p className={styles.whatWeDoDescription}>
              <span className={styles.weProvideComprehensive}>
                We provide comprehensive professional health advice on parameters such as diet, physical activity, ideal screen time, and others which reduce susceptibility to workplace-induced lifestyle disorders.
              </span>
            </p>
          </section>
        </div>
        <img
          className={styles.image8Icon}
          loading="lazy"
          alt="Health and Wellness Illustration"
          src="/Stethoscope.jpg"
        />
        <aside className={styles.socialImpact}>
          <div className={styles.socialProofContainer}>
            <img
              className={styles.socialIcon}
              loading="lazy"
              alt="Social Media Icon"
              src="/social.svg"
            />
            <div className={styles.testimonials}>
              <img
                className={styles.socialIcon1}
                loading="lazy"
                alt="Social Proof 1"
                src="/social-1.svg"
              />
            </div>
            <div className={styles.testimonials1}>
              <img
                className={styles.socialIcon2}
                loading="lazy"
                alt="Social Proof 2"
                src="/social-2@2x.png"
              />
            </div>
            <div className={styles.testimonials2}>
              <img
                className={styles.socialIcon3}
                loading="lazy"
                alt="Social Proof 3"
                src="/social-3@2x.png"
              />
            </div>
          </div>
        </aside>
      </article>
      <div className={styles.visionContentWrapper}>
        <article className={styles.visionContent}>
          <section className={styles.visionStatement}>
            <div className={styles.visionDetails}>
              At MyEasyPharma, our vision is to pioneer a shift in global health
              paradigms, focusing not just on treating illnesses but on preventing
              them before they occur. We primarily aim for improved employee
              health which leads to increased and enhanced efficiency at the
              workplace.
            </div>
          </section>
          <img
            className={styles.image12Icon}
            loading="lazy"
            alt="Vision Illustration"
            src="Vision.jpg"
          />
        </article>
      </div>
    </section>
  );
};

// Function to load authentication state
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

// HeaderComponent to handle authentication state and headers
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
    <div className={styles.headercomp}>
      {! authState.authenticated ? <LandingHeader /> : <UserDashboardHeader />}    </div>
  );
};

// Main AboutUs component
const AboutUs: React.FC = () => {
  return (
    <div className={styles.background}>
      <HeaderComponent />
      <div className={styles.pagedetails}>
        <div className={styles.heading}> 
          <h2 className={styles.headtext}>MyEasyPharma is leading the way in integrating technology with healthcare to
revolutionize preventive health for working professionals. We offer holistic solutions that
combine traditional Ayurveda with modern medicine, supported by research tailored to
your health profile and specific conditions</h2>
          <h3 className={styles.vishead}>Vision</h3>
          <p className={styles.vistext}>At MyEasyPharma, our vision is to create a one-stop destination to take care of your
health and well-being amid a busy schedule, backed by research and integrated with AI
support. To pioneer a shift in global health paradigms, focusing not just on treating
illnesses but on preventing them before they occur. Our primary aim is to improve
employee health, leading to increased and enhanced efficiency in the workplace.
</p>
          <img src="/Vision.png" alt="Vision" className={styles.visimg}/>
          <h3 className={styles.whathead}>What We Do?</h3>
          <p className={styles.whattext}>We offer comprehensive professional health advice on various parameters such as diet,
physical activity, mental health, sleep hygiene, from trivial yet important conditions like
back pain to serious conditions like cancer, all aimed at reducing susceptibility to
workplace-induced lifestyle disorders and managing at holistic level. Our guidance is
personalized to your environment or Prakriti.
</p>
          <img src="/Stethoscope.png" alt="Steth" className={styles.whatimg}/>
          <h3 className={styles.misshead}>Mission</h3>
          <p className={styles.misstext}>Our mission is to alleviate the impact of chronic diseases, their symptoms and enhance
public health by delivering specialized and meticulously curated corporate wellness
initiatives</p>
          <img src="/Mission.png" alt="mission" className={styles.missimg}/>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
