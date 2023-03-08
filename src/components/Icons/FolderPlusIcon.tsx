import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
}

const FolderPlusIcon: React.FC<IconProps> = ({ width = 24, height = 24 }) => {
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
        d="M4 4.5C3.73478 4.5 3.48043 4.60536 3.29289 4.79289C3.10536 4.98043 3 5.23478 3 5.5V19.5C3 19.7652 3.10536 20.0196 3.29289 20.2071C3.48043 20.3946 3.73478 20.5 4 20.5H20C20.2652 20.5 20.5196 20.3946 20.7071 20.2071C20.8946 20.0196 21 19.7652 21 19.5V8.5C21 8.23478 20.8946 7.98043 20.7071 7.79289C20.5196 7.60536 20.2652 7.5 20 7.5H11C10.6656 7.5 10.3534 7.3329 10.1679 7.0547L8.46482 4.5H4ZM1.87868 3.37868C2.44129 2.81607 3.20435 2.5 4 2.5H9C9.33435 2.5 9.64658 2.6671 9.83205 2.9453L11.5352 5.5H20C20.7957 5.5 21.5587 5.81607 22.1213 6.37868C22.6839 6.94129 23 7.70435 23 8.5V19.5C23 20.2957 22.6839 21.0587 22.1213 21.6213C21.5587 22.1839 20.7957 22.5 20 22.5H4C3.20435 22.5 2.44129 22.1839 1.87868 21.6213C1.31607 21.0587 1 20.2957 1 19.5V5.5C1 4.70435 1.31607 3.94129 1.87868 3.37868Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 10.5C12.5523 10.5 13 10.9477 13 11.5V17.5C13 18.0523 12.5523 18.5 12 18.5C11.4477 18.5 11 18.0523 11 17.5V11.5C11 10.9477 11.4477 10.5 12 10.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 14.5C8 13.9477 8.44772 13.5 9 13.5H15C15.5523 13.5 16 13.9477 16 14.5C16 15.0523 15.5523 15.5 15 15.5H9C8.44772 15.5 8 15.0523 8 14.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default FolderPlusIcon;
