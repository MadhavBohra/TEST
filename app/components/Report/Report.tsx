// src/components/Report.js
'use client';

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Report.module.css';

interface ReportProps {
  weight: string;
}

const Report: React.FC<ReportProps> = ({ weight }) => {
  const weightPercentage = 100 - parseInt(weight, 10); // assuming weight is a percentage decrease

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Reports</h2>
      <div className={styles.reportItem}>
      <div ><CircularProgress variant="determinate" value={weightPercentage} className={styles.cir}/></div>
      <p className={styles.text}>Weight {weight}% decrease</p>
      </div>
    </div>
  );
};

export default Report;
