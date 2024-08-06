'use client';

import styles from './Watertaken.module.css';

interface WatertakenProps {
  name: string;
  water: string;
}

const Watertaken: React.FC<WatertakenProps> = ({ name, water }) => {
  return (
    <div className={styles.card} >
      <div className={styles.imageContainer}>
        <img src="/Watertaken.png" alt="Meditation" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
      <h2 className={styles.water}>{water}litres</h2>
      <h2 className={styles.greeting}>{name}</h2>
      </div>
      
    </div>
  );
}

export default Watertaken;
