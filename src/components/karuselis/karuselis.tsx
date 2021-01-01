/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useRef, useState, useEffect } from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import style from './karuselis.module.scss';
import { Blog } from '../../types/types';

let activeIndex = 0;

export const Karuselis: FC = () => {
  const timeout = useRef();

  const allBlogs = useSelector((state: RootState) => {
    return state.blogs;
  });

  const filterNewestBlogs = () => {
    allBlogs.sort((firstEl, secondEl) => {
      if (firstEl.createdAt > secondEl.createdAt) {
        return -1;
      }
      return 1;
    });
    const newestBlogs = allBlogs.slice(0, 5);
    return newestBlogs;
  };

  const blogs = filterNewestBlogs();
  const [activeBlog, setActiveBlog] = useState<Blog>(blogs[0]);

  const clickRightArrowHandler = () => {
    activeIndex += 1;
    if (activeIndex > 4) activeIndex = 0;
    clearTimeout(timeout.current);
    setActiveBlog(blogs[activeIndex]);
  };

  const clickLeftArrowHandler = () => {
    activeIndex -= 1;
    if (activeIndex < 0) activeIndex = 4;
    clearTimeout(timeout.current);
    setActiveBlog(blogs[activeIndex]);
  };

  const history = useHistory();

  const clickOnBlackSpot = (blogId: string) => {
    history.push(`/blog/${blogId}`);
  };

  useEffect(() => {
    // @ts-ignore
    timeout.current = setTimeout(() => {
      activeIndex += 1;
      if (activeIndex > 4) activeIndex = 0;
      setActiveBlog(blogs[activeIndex]);
    }, 3000);
    return () => {
      clearTimeout(timeout.current);
    };
  }, [activeBlog]);

  return (
    <div style={{ backgroundImage: `url(${activeBlog?.image})` }} className={style.karuselis}>
      <div className={style.arrowsWrapper}>
        <BsChevronDoubleLeft className={style.arrow} onClick={clickLeftArrowHandler} />
        <BsChevronDoubleRight className={style.arrow} onClick={clickRightArrowHandler} />
      </div>
      <div className={style.textRadioWrapper}>
        <div onClick={() => clickOnBlackSpot(activeBlog?.id)} className={style.textWrapper}>
          <h2 className={style.header}>{activeBlog?.title}</h2>
          <p className={style.parag}>{activeBlog?.author.name}</p>
        </div>
      </div>
    </div>
  );
};
