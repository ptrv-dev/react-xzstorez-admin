import React from 'react';
import { NavLink } from 'react-router-dom';

import FolderIcon from '../Icons/FolderIcon';
import GridIcon from '../Icons/GridIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import TagIcon from '../Icons/TagIcon';
import BriefCaseIcon from '../Icons/BriefCaseIcon';

import style from './ASide.module.scss';

interface NavigationItemProps {
  icon: React.ReactElement;
  title: string;
  href: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon,
  title,
  href,
}) => {
  return (
    <NavLink to={href} className={style.navigationItem}>
      <>
        {icon}
        {title}
      </>
    </NavLink>
  );
};

const navigation = [
  {
    icon: <FolderIcon />,
    title: 'Products',
    href: '/',
  },
  {
    icon: <GridIcon />,
    title: 'Categories',
    href: '/categories',
  },
  {
    icon: <BriefCaseIcon />,
    title: 'Brands',
    href: '/brands',
  },
  {
    icon: <TagIcon />,
    title: 'Coupons',
    href: '/coupons',
  },
  {
    icon: <SettingsIcon />,
    title: 'Settings',
    href: '/settings',
  },
];

const ASide: React.FC = () => {
  return (
    <div className={style.aside}>
      <h4 className={style.asideTitle}>Admin Panel</h4>
      <nav className={style.asideNav}>
        <ul className={style.asideList}>
          {navigation.map((item, idx) => (
            <li className={style.asideItem} key={idx}>
              <NavigationItem
                icon={item.icon}
                title={item.title}
                href={item.href}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ASide;
