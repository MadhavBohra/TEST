'use client';

import styles from './Stepcounter.module.css';

interface StepCounterProps {
  name: string;
  steps: string;
}

const StepCounter: React.FC<StepCounterProps> = ({ name, steps }) => {
  return (
    <div className={styles.card} >
      <div className={styles.imageContainer}>
        <img src="/Feet.png" alt="Meditation" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
      <h2 className={styles.steps}>{steps}<span className={styles.username}>/3000</span></h2>
      <h2 className={styles.greeting}> {name}</h2>
      </div>
      
    </div>
  );
}

export default StepCounter;
