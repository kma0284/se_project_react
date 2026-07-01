import { useEffect } from "react";
import "./Modal.css";
import closeIcon from "../../assets/closeIconDark.svg";

export default function Modal({ isOpen, onClose, children, className = "" }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = () => onClose();

  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal__content ${className}`} onClick={handleModalClick}>
        {" "}
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        {children}
      </div>
    </div>
  );
}
