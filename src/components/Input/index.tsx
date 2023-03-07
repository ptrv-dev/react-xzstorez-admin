import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import style from './Input.module.scss';

interface InputProps {
  type: string;
  placeholder?: string;
  value?: string | number | undefined;
  icon?: React.ReactElement;
  error?: boolean | string;
  name?: string;
  register?: UseFormRegister<any>;
  validationSchema?: any;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  icon,
  name,
  error,
  register,
  validationSchema,
}) => {
  if (register && !name) throw 'Enter a name for input!';
  if (register)
    return (
      <div className={style.inputWrapper}>
        {icon}
        <input
          type={type}
          value={value}
          id={name}
          placeholder={placeholder}
          className={`${style.input} ${icon ? style.inputWithIcon : ''} ${
            error ? style.error : ''
          }`}
          {...register(name!, validationSchema)}
        />
        {error && typeof error === 'string' && (
          <p className={style.errorContainer}>{error}</p>
        )}
      </div>
    );
  return (
    <div className={style.inputWrapper}>
      {icon}
      <input
        type={type}
        value={value}
        id={name}
        placeholder={placeholder}
        className={`${style.input} ${icon ? style.inputWithIcon : ''} ${
          error ? style.error : ''
        }`}
      />
      {error && typeof error === 'string' && (
        <p className={style.errorContainer}>{error}</p>
      )}
    </div>
  );
};

export default Input;
