'use client';

import React from 'react';
import styles from './Reminders.module.css';

interface ReminderProps {
  dur1: string;
  ex1: string;
  dur2: string;
  ex2: string;
}

const Reminder: React.FC<ReminderProps> = ({ dur1, ex1, dur2, ex2 }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Reminders</h2>
      <div className={styles.remindersContainer}>
        <div className={styles.reminderItem}>
          <img src='/Dumbell.png' alt='dumbell' className={styles.img} />
          <p className={styles.text}>{dur1}</p>
          <p className={styles.text}>{ex1}</p>
        </div>
        <div className={styles.reminderItem}>
          <img src='/otherlogo.png' alt='otherlogo' className={styles.img} />
          <p className={styles.text}>{dur2}</p>
          <p className={styles.text}>{ex2}</p>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
