import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import style from './Select.module.scss';

interface SelectProps {
  children: React.ReactNode;
  value?: string | number | undefined;
  icon?: React.ReactElement;
  name?: string;
  register?: UseFormRegister<any>;
  validationSchema?: {};
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.FC<SelectProps> = ({
  children,
  value,
  icon,
  name,
  register,
  validationSchema,
  onChange,
}) => {
  if (register && !name) throw new Error('Enter a name for select!');

  if (register)
    return (
      <div className={style.selectWrapper}>
        {icon}
        <select
          className={`${style.select} ${icon ? style.selectWithIcon : ''}`}
          id={name}
          {...register(name!, validationSchema)}
        >
          {children}
        </select>
      </div>
    );

  return (
    <div className={style.selectWrapper}>
      {icon}
      <select
        className={`${style.select} ${icon ? style.selectWithIcon : ''}`}
        id={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
