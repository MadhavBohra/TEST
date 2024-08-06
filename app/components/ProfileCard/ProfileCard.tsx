'use client';

import Image from 'next/image';
import styles from './ProfileCard.module.css';


interface ProfileCardProps {
    Name: string;
    Age: string;
    Address: string;
    Blood_Group: string;
    Height:string;
    Weight:string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({Name,Age,Address,Blood_Group,Height,Weight}) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Image
          src="/avatar.png" 
          alt="Avatar"
          width={50}
          height={50}
        />
      </div>
      <h2 className={styles.name}>{Name}</h2>
      <p className={styles.ageLocation}>{Age} years old &#8226; {Address}</p>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <p>Blood</p>
          <p>{Blood_Group}</p>
        </div>
        <div className={styles.infoItem}>
          <p>Height</p>
          <p>{Height}</p>
        </div>
        <div className={styles.infoItem}>
          <p>Weight</p>
          <p>{Weight}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
