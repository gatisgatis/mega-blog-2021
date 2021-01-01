import React, { FC } from 'react';
import { v4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import style from './find.module.scss';
import { Button } from '../button/button';
import { RootState } from '../../store/index';
import { changeSearchInput } from '../../store/search/actions';
import { changeActiveTagInput } from '../../store/activeTag/actions';

const uniqTags: string[] = ['all'];

export const Find: FC = () => {
  const blogs = useSelector((state: RootState) => {
    return state.blogs;
  });

  const findUniqTags = () => {
    blogs.forEach((blog) => {
      blog.tags.forEach((tag) => {
        const tagCheck = uniqTags.some((item) => item.toLowerCase() === tag.toLowerCase());
        if (tagCheck === false) {
          uniqTags.push(tag);
        }
      });
    });
  };

  findUniqTags();

  const searchInputValue = useSelector((state: RootState) => {
    return state.search.value;
  });

  const activeTag = useSelector((state: RootState) => {
    return state.activeTag.value;
  });

  const dispatch = useDispatch();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchInput(e.target.value));
  };

  const clickOnTagHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    dispatch(changeActiveTagInput(e.target.innerText));
  };

  return (
    <div className={style.pogas}>
      {uniqTags.map((tag, index) => {
        return (
          index < 15 && (
            <Button
              color={tag === activeTag ? '#66fcf1' : '#45a29e'}
              text={tag}
              key={v4()}
              onClick={clickOnTagHandler}
              size="smaller"
            />
          )
        );
      })}
      <input
        className={style.search}
        onChange={inputChangeHandler}
        value={searchInputValue}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};
