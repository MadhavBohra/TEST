'use client';

import React from 'react';
import Image from 'next/image'; // Import Image component from Next.js
import styles from './UpcomingEvents.module.css';

const UpcomingEvents = () => {
  const events = [
    {

      title: 'Health appointment',
      description: 'Mr Dok tomm',
      time: '08:20AM - 11:30AM',
      dueSoon: false
    },
  ];
  
  return (
    <div className={styles.upcomingEvents}>
      <h2 className={styles.title}>Upcoming</h2>
      <div className={styles.eventsContainer}>
        {events.map((event, index) => (
          <div key={index} className={styles.event}>
            <div className={styles.eventDetails}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <div className={styles.iconContainer}>
                <img className={styles.bellIcon} src='/bellIcon3.png' alt='bell'/>
              </div>
            </div>
            <p className={styles.eventDescription}>{event.description}</p>
            <p className={styles.eventTime}>{event.time}</p>
            {event.dueSoon && <span className={styles.dueSoon}>Due Soon</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
