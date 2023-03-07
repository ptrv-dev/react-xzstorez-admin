import React from 'react';

import LoadingIcon from '../../components/Icons/LoadingIcon';

import style from './LoadingPage.module.scss';

const LoadingPage: React.FC = () => {
  return (
    <div className={style.loadingPage}>
      <LoadingIcon width={48} height={48} />
    </div>
  );
};

export default LoadingPage;
