'use client';

import React from 'react';
import styles from './Calendar.module.css';

interface DatePicker {
  date: string;
  month: string;
  
}


const Calendar = () => {
  const days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [9, 10, 11, 12, 13, 14, 15];

  return (
    <div className={styles.calendar}>
      <div className={styles.monthRow}>
        <div>March</div>
        <button className={styles.addReminderBtn}>+ Add reminder</button>
      </div>
      <div className={styles.dayRow}>
        {days.map((day, index) => (
          <div key={index} className={styles.day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.dateRow}>
        {dates.map((date, index) => (
          <div key={index} className={`${styles.date} ${date === 11 ? styles.selectedDate : ''}`}>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
