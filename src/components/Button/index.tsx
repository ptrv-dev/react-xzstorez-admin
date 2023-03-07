import React from 'react';
import LoadingIcon from '../Icons/LoadingIcon';

import style from './Button.module.scss';

interface ButtonProps {
  children: string;
  icon?: React.ReactElement;
  loading?: boolean;
  color?: 'primary' | 'danger' | 'gray';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  loading = false,
  color = 'primary',
  className,
}) => {
  let colorClassName = '';
  switch (color) {
    case 'primary':
      colorClassName = style.primary;
      break;
    case 'danger':
      colorClassName = style.danger;
      break;
    case 'gray':
      colorClassName = style.gray;
      break;
    default:
      colorClassName = style.primary;
  }
  return (
    <button
      className={`${style.button} ${colorClassName} ${
        className ? className : ''
      }`}
      disabled={loading}
    >
      {loading ? <LoadingIcon /> : icon}
      {children}
    </button>
  );
};

export default Button;
