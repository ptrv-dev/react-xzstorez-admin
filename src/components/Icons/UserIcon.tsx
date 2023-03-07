import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
}

const UserIcon: React.FC<IconProps> = ({ width = 24, height = 24 }) => {
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
        d="M4.46447 15.9645C5.40215 15.0268 6.67392 14.5 8 14.5H16C17.3261 14.5 18.5979 15.0268 19.5355 15.9645C20.4732 16.9021 21 18.1739 21 19.5V21.5C21 22.0523 20.5523 22.5 20 22.5C19.4477 22.5 19 22.0523 19 21.5V19.5C19 18.7044 18.6839 17.9413 18.1213 17.3787C17.5587 16.8161 16.7956 16.5 16 16.5H8C7.20435 16.5 6.44129 16.8161 5.87868 17.3787C5.31607 17.9413 5 18.7044 5 19.5V21.5C5 22.0523 4.55228 22.5 4 22.5C3.44772 22.5 3 22.0523 3 21.5V19.5C3 18.1739 3.52678 16.9021 4.46447 15.9645Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4.5C10.3431 4.5 9 5.84315 9 7.5C9 9.15685 10.3431 10.5 12 10.5C13.6569 10.5 15 9.15685 15 7.5C15 5.84315 13.6569 4.5 12 4.5ZM7 7.5C7 4.73858 9.23858 2.5 12 2.5C14.7614 2.5 17 4.73858 17 7.5C17 10.2614 14.7614 12.5 12 12.5C9.23858 12.5 7 10.2614 7 7.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default UserIcon;
