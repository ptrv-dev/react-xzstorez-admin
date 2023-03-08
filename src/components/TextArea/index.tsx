import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import style from './TextArea.module.scss';

interface TextAreaProps {
  children?: string;
  placeholder?: string;
  value?: string | number | undefined;
  error?: boolean | string;
  name?: string;
  register?: UseFormRegister<any>;
  validationSchema?: {};
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  children,
  placeholder,
  value,
  error,
  name,
  register,
  validationSchema,
  onChange,
  rows,
  cols,
}) => {
  if (register && !name) throw new Error('Enter a name for textarea!');

  if (register)
    return (
      <div className={style.textareaWrapper}>
        <textarea
          placeholder={placeholder}
          id={name}
          rows={rows}
          cols={cols}
          className={`${style.textarea} ${error ? style.error : ''}`}
          {...register(name!, validationSchema)}
        >
          {children}
        </textarea>
        {error && typeof error === 'string' && (
          <p className={style.errorContainer}>{error}</p>
        )}
      </div>
    );

  return (
    <div className={style.textareaWrapper}>
      <textarea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        id={name}
        rows={rows}
        cols={cols}
        className={`${style.textarea} ${error ? style.error : ''}`}
      >
        {children}
      </textarea>
      {error && typeof error === 'string' && (
        <p className={style.errorContainer}>{error}</p>
      )}
    </div>
  );
};

export default TextArea;
