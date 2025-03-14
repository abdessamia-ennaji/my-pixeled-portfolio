import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import './Cell.css';

interface CellProps {
  iconName: string;
  title: string;
  iconClassName?: string;
  isFocused?: boolean; // Add focus prop
}

const Cell: React.FC<CellProps> = ({ iconName, title, iconClassName, isFocused }) => {
  const path = `/${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="col-lg-3 col-md-6 col-12">
      <Link to={path} className={`cell ${isFocused ? 'focused' : ''}`}>
        <Icon className={iconClassName} name={iconName} />
        <h1 className="silkscreen-regular">{title}</h1>
      </Link>
    </div>
  );
};

export default Cell;