import React from 'react';
import './component.scss'
interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Form Submitted Successfully!</h2>
        <p>Thank you for submitting the form.</p>
        <button onClick={onClose} className='button'>Close</button>
      </div>
    </div>
  );
};

export default Popup;
