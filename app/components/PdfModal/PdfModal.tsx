import React from 'react';
import './PDFModal.css';

interface PDFModalProps {
  pdfUrl: string;
  onClose: () => void;
}

const PDFModal: React.FC<PDFModalProps> = ({ pdfUrl, onClose }) => {
  return (
    <div className="pdf-viewer-overlay" onClick={onClose}>
      <div className="pdf-viewer-container" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-button">&times;</button>
        <embed 
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PDFModal;