import React, { FC } from 'react';
import {  useSelector } from 'react-redux';
import moment from 'moment';
import { GiNorthStarShuriken } from 'react-icons/gi';
import style from './userinfo.module.scss';
import { RootState } from '../../store';

export const Userinfo: FC = () => {
  const activeUser = useSelector((state: RootState) => {
    return state.activeUser;
  });

  return (
    <div className={style.container}>
      <div className={style.UsernameInfo}>
        <h2 className={style.username}>Account Status: {activeUser.status}</h2>
        <h2 className={style.username}>CreatedAt: {moment.unix(activeUser.createdAt/ 1000).format('L')}</h2>  
        <h2 className={style.username}>Username : {activeUser.username}</h2>
        <h2 className={style.username}>Password: {activeUser.password}</h2>
      </div>
      <div className={style.info}>
        <div className={style.imageWrapper}>
          <img className={style.image} src={activeUser.image} alt="" />
        </div>
        <div className={style.infoWrapper}>
          <h2 className={style.infoText}>
            Acount Rating : {activeUser.rating} <GiNorthStarShuriken />
          </h2>
          <h2 className={style.infoText}>Name : {activeUser.name}</h2>
          <h2 className={style.infoText}>Age: {activeUser.age}</h2>
          <h2 className={style.infoText}>Gender: {activeUser.gender}</h2>
        </div>
      </div>
    </div>
  );
};
