import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
}

const SearchIcon: React.FC<IconProps> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4.5C7.13401 4.5 4 7.63401 4 11.5C4 15.366 7.13401 18.5 11 18.5C14.866 18.5 18 15.366 18 11.5C18 7.63401 14.866 4.5 11 4.5ZM2 11.5C2 6.52944 6.02944 2.5 11 2.5C15.9706 2.5 20 6.52944 20 11.5C20 16.4706 15.9706 20.5 11 20.5C6.02944 20.5 2 16.4706 2 11.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9428 16.4429C16.3333 16.0524 16.9665 16.0524 17.357 16.4429L21.707 20.7929C22.0975 21.1834 22.0975 21.8166 21.707 22.2071C21.3165 22.5976 20.6833 22.5976 20.2928 22.2071L15.9428 17.8571C15.5523 17.4666 15.5523 16.8334 15.9428 16.4429Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SearchIcon;
