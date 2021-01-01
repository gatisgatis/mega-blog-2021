import React, { FC, useState } from 'react';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { GiNorthStarShuriken } from 'react-icons/gi';
import { AiOutlineLike } from 'react-icons/ai';
import Axios from 'axios';
import { IoTimeOutline } from 'react-icons/io5';
import moment from 'moment';
import { Button } from '../button/button';
import style from './comments.module.scss';
import { Comment, Author, Blog } from '../../types/types';
import { editBlog } from '../../store/blogs/actions';
import { RootState } from '../../store';

type Props = {
  id: string;
};

export const Comments: FC<Props> = ({ id }) => {
  const [comentInputField, setComentInputField] = useState('');

  const dispach = useDispatch();
  const activeUser = useSelector((state: RootState) => {
    return state.activeUser;
  });

  const blogs = useSelector((state: RootState) => {
    return state.blogs;
  });

  const blog = blogs.find((item) => item.id === id);
  const addComentHandler = () => {
    if (comentInputField === '') return;
    const commentAuthor: Author = {
      name: activeUser.name,
      image: activeUser.image || '',
      rating: activeUser.rating,
    };
    const newBlog = cloneDeep(blog);
    const newComment: Comment = {
      author: commentAuthor,
      creatAt: Date.now(),
      likes: 0,
      text: comentInputField,
    };
    newBlog!.comments.push(newComment);
    const blogsLocalStorage: Blog[] = JSON.parse(localStorage.blogs || '[]');
    let editIndex = -1;
    blogsLocalStorage.forEach((item, index) => {
      if (item.id === newBlog!.id) editIndex = index;
    });
    blogsLocalStorage[editIndex] = newBlog!;
    localStorage.blogs = JSON.stringify(blogsLocalStorage);
    dispach(editBlog(newBlog!));
    setComentInputField('');
  };

  const addLikeHandler = (index: number) => {
    const newBlog = cloneDeep(blog);
    newBlog!.comments[index].likes += 1;
    const blogsLocalStorage: Blog[] = JSON.parse(localStorage.blogs || '[]');
    let editIndex = -1;
    blogsLocalStorage.forEach((item, index1) => {
      if (item.id === newBlog!.id) editIndex = index1;
    });
    blogsLocalStorage[editIndex] = newBlog!;
    localStorage.blogs = JSON.stringify(blogsLocalStorage);
    dispach(editBlog(newBlog!));
  };

  const randomComment = () => {
    const randomId = Math.floor(Math.random() * 99) + 1;
    const randomizeId = Math.floor(Math.random() * 4);
    Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${randomId}`).then(
      (response) => {
        const commentAuthor: Author = {
          name: activeUser.name,
          image: activeUser.image || '',
          rating: activeUser.rating,
        };
        const newBlog = cloneDeep(blog);
        const newComment: Comment = {
          author: commentAuthor,
          creatAt: Date.now(),
          likes: 0,
          text: response.data[randomizeId].body,
        };
        newBlog!.comments.push(newComment);
        const blogsLocalStorage: Blog[] = JSON.parse(localStorage.blogs || '[]');
        let editIndex = -1;
        blogsLocalStorage.forEach((item, index) => {
          if (item.id === newBlog!.id) editIndex = index;
        });
        blogsLocalStorage[editIndex] = newBlog!;
        localStorage.blogs = JSON.stringify(blogsLocalStorage);
        dispach(editBlog(newBlog!));
        setComentInputField('');
      }
    );
  };

  return (
    <div className={style.comments}>
      <div className={style.wrapper}>
        {blog!.comments.map((coment, index) => {
          return (
            <div key={v4()}>
              <div>
                <div className={style.imgText}>
                  <div className={style.imageWrapper}>
                    <img className={style.image} src={coment.author.image} alt="" />
                  </div>
                  <div>
                    <h4 className={style.author}>Author: {coment.author.name}</h4>
                    <h4 className={style.author}>
                      Rating: {coment.author.rating} <GiNorthStarShuriken />
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <h4 className={style.creatAt}>
                  <IoTimeOutline />
                  {moment.unix(coment.creatAt / 1000).format('L')}
                </h4>
                <h4 className={style.creatAt}>
                  Likes: {coment.likes} <AiOutlineLike />
                </h4>
              </div>
              <h4 className={style.creatAtone}>{coment.text}</h4>
              <button
                className={style.likeButton}
                type="button"
                onClick={() => addLikeHandler(index)}
              >
                {' '}
                <AiOutlineLike />{' '}
              </button>
            </div>
          );
        })}
      </div>
      <div className={style.commentField}>
        <div>
          <h3 className={style.commentTitle}> Add comments </h3>
        </div>
        <div>
          <input
            className={style.input}
            placeholder="Comment"
            onChange={(e) => setComentInputField(e.target.value)}
            value={comentInputField}
            type="text"
          />
        </div>
        <div>
          <Button size="smaller" color="#45a29e" text="Add Comment" onClick={addComentHandler} />
          {activeUser.status !== 'guest' && (
            <Button
              size="smaller"
              color="#45a29e"
              text="Generate Comment"
              onClick={randomComment}
            />
          )}
        </div>
      </div>
    </div>
  );
};
