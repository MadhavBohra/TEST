'use client';
import React from 'react';
import styles from './UsernameCard.module.css';

interface UsernameCardProps {
  name: string;
  message: string;
}

const UsernameCard: React.FC<UsernameCardProps> = ({ name, message }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textContainer}>
        <h2 className={styles.greeting}>Hello <span className={styles.username}>{name}</span>,</h2>
        <p className={styles.message}>{message}</p>
        <a className={styles.link} href="#">
          Learn More
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img src="/meditation.png" alt="Meditation" className={styles.image} />
      </div>
    </div>
  );
}

export default UsernameCard;
