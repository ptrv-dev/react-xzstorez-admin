import React from 'react';

import PlusIcon from '../Icons/PlusIcon';
import TrashIcon from '../Icons/TrashIcon';

import style from './FormImage.module.scss';

interface FormImageProps {
  href?: string | File;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  refs?: React.Ref<any>;
  onRemove?: React.MouseEventHandler<HTMLSpanElement>;
}

const FormImage: React.FC<FormImageProps> = ({
  href,
  button,
  onClick,
  refs,
  onRemove,
}) => {
  const reader = new FileReader();
  const [src, setSrc] = React.useState<string | ArrayBuffer>(
    typeof href === 'string' ? href : ''
  );

  reader.onload = (e) => {
    if (e.target && e.target.result) setSrc(e.target?.result);
  };
  if (href && typeof href !== 'string') reader.readAsDataURL(href);

  if (button) {
    return (
      <div className={style.button} onClick={onClick}>
        <PlusIcon />
      </div>
    );
  }

  return (
    <div ref={refs} className={style.imageWrapper}>
      <span onClick={onRemove} className={style.remove}>
        <TrashIcon />
      </span>
      <img src={String(src)} alt="" className={style.image} />
    </div>
  );
};

export default FormImage;
