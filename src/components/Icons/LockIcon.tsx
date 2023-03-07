import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
}

const LockIcon:React.FC<IconProps> = ({width=24,height=24}) => {
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
        d="M5 12.5C4.44772 12.5 4 12.9477 4 13.5V20.5C4 21.0523 4.44772 21.5 5 21.5H19C19.5523 21.5 20 21.0523 20 20.5V13.5C20 12.9477 19.5523 12.5 19 12.5H5ZM2 13.5C2 11.8431 3.34315 10.5 5 10.5H19C20.6569 10.5 22 11.8431 22 13.5V20.5C22 22.1569 20.6569 23.5 19 23.5H5C3.34315 23.5 2 22.1569 2 20.5V13.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.5C10.9391 3.5 9.92172 3.92143 9.17157 4.67157C8.42143 5.42172 8 6.43913 8 7.5V11.5C8 12.0523 7.55228 12.5 7 12.5C6.44772 12.5 6 12.0523 6 11.5V7.5C6 5.9087 6.63214 4.38258 7.75736 3.25736C8.88258 2.13214 10.4087 1.5 12 1.5C13.5913 1.5 15.1174 2.13214 16.2426 3.25736C17.3679 4.38258 18 5.9087 18 7.5V11.5C18 12.0523 17.5523 12.5 17 12.5C16.4477 12.5 16 12.0523 16 11.5V7.5C16 6.43913 15.5786 5.42172 14.8284 4.67157C14.0783 3.92143 13.0609 3.5 12 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LockIcon;
