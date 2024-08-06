// OtpModal.tsx

import React from 'react';
import './otpmodal.css';

interface OtpModalProps {
  isOpen: boolean;
  otp: string;
  setOtp: (otp: string) => void;
  handleOTPSubmit: () => void;
  closeModal: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, otp, setOtp, handleOTPSubmit, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h2>Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={handleOTPSubmit}>Verify OTP</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default OtpModal;
