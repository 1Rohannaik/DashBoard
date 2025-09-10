import { useEffect, useRef } from "react";
import EChart from "./EChart";

const ChartModal = ({ chart, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Focus management for accessibility
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="chart-modal-overlay"
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div className="chart-modal">
        <div className="chart-modal-header">
          <h2 className="chart-modal-title">
            {chart.type.toUpperCase()} Chart
          </h2>
          <button
            className="chart-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="chart-modal-body">
          <EChart className="chart-modal-content" option={chart.option} />
        </div>
      </div>
    </div>
  );
};

export default ChartModal;
