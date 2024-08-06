'use client';

import styles from './Caloriecounter.module.css';

interface CalorieCounterProps {
  name: string;
  calories: string;
}

const CalorieCounter: React.FC<CalorieCounterProps> = ({ name, calories }) => {
  return (
    <div className={styles.card} >
      <div className={styles.imageContainer}>
        <img src="/CalorieBurn.png" alt="Meditation" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
      <h2 className={styles.calorie}>{calories}kcal</h2>
      <h2 className={styles.greeting}>{name}</h2>
      </div>
      
    </div>
  );
}

export default CalorieCounter;
