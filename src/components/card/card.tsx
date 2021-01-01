/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { v4 } from 'uuid';
import style from './card.module.scss';
import { Button } from '../button/button';

interface Props {
  title: string;
  authorName: string;
  creatDate: number;
  tags: string[];
  commentCount: number;
  image: string;
  text: string;
  id: string;
}

export const Card: FC<Props> = ({
  title,
  authorName,
  creatDate,
  tags,
  commentCount,
  image,
  text,
  id,
}) => {
  const history = useHistory();

  const goToBlogPage = (blogId: string) => {
    history.push(`/blog/${blogId}`);
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <div className={style.card}>
      <h1 onClick={() => goToBlogPage(id)} className={style.heading}>
        {title}{' '}
      </h1>
      <div className={style.smallHeadingWrapper}>
        <h4 className={style.smallHeading}> {authorName} </h4>
        <h4 className={style.smallHeading}> {moment.unix(creatDate/ 1000).format('MMMM Do YYYY')} </h4>
        <div className={style.smallHeading}>
          {tags.map((tag, index) => {
            return index < 5 && <span key={v4()} className={style.smallHeading}> {tag} </span>;
          })}
        </div>
        <h4 className={style.smallHeading}>Comments: {commentCount} </h4>
      </div>
      <div className={style.cardBox}>
        <div className={style.imgWrapper}>
          <img className={style.img} src={image} alt={title} />
        </div>
        <div className={style.paragWrapper}>
          <div>
            <p className={style.parag}>{`${text.substring(0, 200)}...`}</p>
          </div>
          <div className={style.buttonWrapp}>
            <Button text="Read More" onClick={() => goToBlogPage(id)} color="#45a29e" />
          </div>
        </div>
      </div>
    </div>
  );
};
