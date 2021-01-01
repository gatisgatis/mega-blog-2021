import React, { FC, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai';
import { IoTimeOutline } from 'react-icons/io5';
import { v4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button/button';
import { Comments } from '../comments/comments';
import { Author } from '../author/author';
import { Blog } from '../../types/types';
import style from './fullBlog.module.scss';
import { changeActiveTagInput } from '../../store/activeTag/actions';
import { editBlog, deleteBlog } from '../../store/blogs/actions';
import { RootState } from '../../store';

type Props = {
  blog: Blog;
};

export const FullBlog: FC<Props> = ({ blog }) => {
  const [image, setImage] = useState(blog.image);
  const [title, setTitle] = useState(blog.title);
  const [text, setText] = useState(blog.text);
  const [tags, setTags] = useState(blog.tags.join(' '));

  const [showEditBlogForm, setShowEditBlogForm] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const activeUser = useSelector((state: RootState) => {
    return state.activeUser;
  });

  const clickOnTagHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    history.push('/');
    // @ts-ignore
    dispatch(changeActiveTagInput(e.target.innerText));
  };

  const applyEditedBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const blogTags = tags.split(' ');
    const newBlog: Blog = cloneDeep(blog);
    newBlog.image = image;
    newBlog.tags = blogTags;
    newBlog.text = text;
    newBlog.title = title;
    const blogsLocalStorage: Blog[] = JSON.parse(localStorage.blogs || '[]');
    let editIndex = -1;
    blogsLocalStorage.forEach((item, index) => {
      if (item.id === newBlog.id) editIndex = index;
    });
    blogsLocalStorage[editIndex] = newBlog;
    localStorage.blogs = JSON.stringify(blogsLocalStorage);
    dispatch(editBlog(newBlog));
    setShowEditBlogForm(false);
  };

  const deleteTheBlog = () => {
    const blogsLocalStorage: Blog[] = JSON.parse(localStorage.blogs || '[]');
    let deleteIndex = -1;
    blogsLocalStorage.forEach((item, index) => {
      if (item.id === blog.id) deleteIndex = index;
    });
    blogsLocalStorage.splice(deleteIndex, 1);
    localStorage.blogs = JSON.stringify(blogsLocalStorage);
    dispatch(deleteBlog(blog.id));
    history.push('/');
  };

  return (
    <div className={style.card}>
      <h1 className={style.title}>{blog.title}</h1>
      <div className={style.adminButtons}>
        {activeUser.status === 'admin' && (
          <Button text="Edit blog" color="#45a29e" onClick={() => setShowEditBlogForm(true)} />
        )}
        {activeUser.status === 'admin' && (
          <Button text="Delete blog" color="#45a29e" onClick={() => deleteTheBlog()} />
        )}
      </div>
      <div className={style.infoWrapper}>
        <div className={style.info}>
          {blog.tags.map((tag, index) => {
            return (
              index < 5 && (
                <Button
                  color="#45a29e"
                  text={tag}
                  key={v4()}
                  onClick={(e) => clickOnTagHandler(e)}
                  size="smaller"
                />
              )
            );
          })}
        </div>
        <h4 className={style.info}>
          {' '}
          <IoTimeOutline /> {moment.unix(blog.createdAt / 1000).format('L')}{' '}
        </h4>
        <h4 className={style.info}>
          {' '}
          Post Likes : {blog.likes} <AiOutlineLike />{' '}
        </h4>
        <h4 className={style.info}> ID: {blog.id}</h4>
      </div>
      <Author name={blog.author.name} img={blog.author.image} rating={blog.author.rating} />
      <div className={style.imageWrapper}>
        <img className={style.image} src={blog.image} alt="" />
      </div>
      <p className={style.parag}>{blog.text}</p>
      <Comments id={blog.id} />
      <div className={style.homeButton}>
        <Button color="#45a29e" text="Home" onClick={() => history.push('/')} />
      </div>
      {showEditBlogForm && (
        <div>
          <form onSubmit={(e) => applyEditedBlog(e)} action="submit">
            <h3 className={style.editHeading}>Edit blog here!</h3>
            <div className={style.editPost}>
              <div>
                <span className={style.editSpan}> Image </span>
                <br />
                <textarea
                  className={style.textarea}
                  value={image}
                  placeholder="Image Link"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div>
                <span className={style.editSpan}> Title </span>
                <br />
                <textarea
                  className={style.textarea}
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <span className={style.editSpan}>Text</span>
                <br />
                <textarea
                  className={style.textareaText}
                  value={text}
                  placeholder="Description"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div>
                <span className={style.editSpan}>Tags</span>
                <br />
                <textarea
                  className={style.textarea}
                  value={tags}
                  placeholder="Tags"
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              <Button
                color="#45a29e"
                text="Apply Changes"
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                isTypeButton={false}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
