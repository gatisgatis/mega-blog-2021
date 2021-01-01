import { NavLink } from 'react-router-dom';
import React, { FC } from 'react';
import style from './navigation.module.scss';

export const Nav: FC = () => {
  return (
    <div className={style.navWrapper}>
      <NavLink className={style.nav} to="/"> Home </NavLink>
      <NavLink className={style.nav} to="/about"> About </NavLink>
    </div>
  );
};
