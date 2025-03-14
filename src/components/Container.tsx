import React from 'react';
import './Container.css';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="custom-container">
      <div className="row g-3">
        {children}
      </div>
    </div>
  );
};

export default Container;