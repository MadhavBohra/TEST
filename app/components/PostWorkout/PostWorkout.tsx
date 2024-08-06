'use client';

import React from 'react';
import styles from './PostWorkoutSessionCard.module.css';

const PostWorkoutSessionCard = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Post workout sessions</h2>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>Meditation</h3>
        <p className={styles.time}>5:00PM - 6:00PM</p>
        <p className={styles.coach}>Coach: Tim Bjorvick</p>
      </div>
    </div>
  );
};

export default PostWorkoutSessionCard;
