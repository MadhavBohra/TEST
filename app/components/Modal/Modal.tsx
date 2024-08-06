import React, { useState } from 'react';
import axios from 'axios';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (steps: string, waterIntake: string, caloriesBurnt: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [steps, setSteps] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');

  const handleSubmit = async () => {
    onSave(steps, waterIntake, caloriesBurnt);
    try {
      const response = await axios.post('/api/healthfrommodal', {
        steps,
        waterIntake,
        caloriesBurnt,
      });
      if (response.status === 200) {
        console.log('Data saved successfully');
      } else {
        console.error('Error saving data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Update Data</h2>
        <label>
          Steps:
          <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} />
        </label>
        <label>
          Water Intake:
          <input type="number" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} />
        </label>
        <label>
          Calories Burnt:
          <input type="number" value={caloriesBurnt} onChange={(e) => setCaloriesBurnt(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
