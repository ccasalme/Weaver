import React from "react";

interface OOPSModalProps {
  onClose: () => void;
  switchToLogin: () => void;
  switchToJoinUs: () => void;
}

const OOPSModal: React.FC<OOPSModalProps> = ({
  onClose,
  switchToLogin,
  switchToJoinUs,
}) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{color: "white"}}>OOPS! Looks like you're not logged in!</h2>
        <p style={{color: "white", background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)"}}> Please login or join us to perform this action.</p>
        <button onClick={switchToLogin}>Login</button>
        <button onClick={switchToJoinUs}>Join Us</button>
        <button onClick={onClose} className="close-btn">
          ❎
        </button>
      </div>
    </div>
  );
};

export default OOPSModal;
