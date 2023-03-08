import React from 'react';
import LoadingIcon from '../Icons/LoadingIcon';

import style from './Button.module.scss';

interface ButtonProps {
  children: string;
  icon?: React.ReactElement;
  loading?: boolean;
  color?: 'primary' | 'danger' | 'gray';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  loading = false,
  color = 'primary',
  className,
  onClick,
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
      onClick={onClick}
    >
      {loading ? <LoadingIcon /> : icon}
      {children}
    </button>
  );
};

export default Button;
