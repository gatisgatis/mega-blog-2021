import React, { FC } from 'react';
import { GiNorthStarShuriken } from 'react-icons/gi';
import style from './author.module.scss';

type Props = {
  name: string;
  img: string;
  rating: number;
};

export const Author: FC<Props> = ({ name, img, rating }) => {
  return (
    <div className={style.authorWrapper}>
      <div className={style.imageWrapper}>
        <img className={style.image} src={img} alt="" />
      </div>
      <div className={style.nameRatingWrapper}>
        <h3 className={style.name}>Author: {name}</h3>
        <h3 className={style.rating}> Rating: {rating} <GiNorthStarShuriken /></h3>
      </div>
    </div>
  );
};
