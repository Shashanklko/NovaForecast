import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array(count).fill(null);

  if (type === 'card') {
    return (
      <div className="skeleton-container">
        {skeletons.map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-circle"></div>
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-line skeleton-text-short"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="skeleton-table">
        {skeletons.map((_, index) => (
          <div key={index} className="skeleton-row">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-container">
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="skeleton-line"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

