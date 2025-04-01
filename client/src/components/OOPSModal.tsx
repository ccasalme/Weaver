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
        <h2>OOPS! Looks like you're not logged in!</h2>
        <p>Please login or join us to perform this action.</p>
        <button onClick={switchToLogin}>Login</button>
        <button onClick={switchToJoinUs}>Join Us</button>
      </div>
    </div>
  );
};

export default OOPSModal;
