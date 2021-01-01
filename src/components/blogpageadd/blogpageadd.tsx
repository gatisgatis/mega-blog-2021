import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import Axios from 'axios';
import { Blog } from '../../types/types';
import { RootState } from '../../store';
import { addBlog } from '../../store/blogs/actions';
import { Button } from '../button/button';
import style from './blogpageadd.module.scss';

export const Blogpageadd: FC = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [errorInfo, setErrorInfo] = useState('');

  const dispatch = useDispatch();

  const activeUser = useSelector((state: RootState) => {
    return state.activeUser;
  });

  const submitBlog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setErrorInfo('');
    }, 3000);
    if (image === '' || title === '' || text === '' || tag === '') {
      setErrorInfo('Fill the emty fields');
      return;
    }

    const blogTags = tag.split(' ');

    const newBlog: Blog = {
      id: v4(),
      title,
      createdAt: Date.now(),
      text,
      image,
      tags: blogTags,
      likes: 0,
      author: {
        name: activeUser.name,
        rating: activeUser.rating,
        image: activeUser.image || '',
      },
      comments: [],
    };
    const blogsLocalStorage = JSON.parse(localStorage.blogs || '[]');
    blogsLocalStorage.push(newBlog);
    localStorage.blogs = JSON.stringify(blogsLocalStorage);
    dispatch(addBlog(newBlog));
    setText('');
    setTitle('');
    setTag('');
    setErrorInfo('Blog Added');
    setImage('');
  };

  const generateBlogFromApi = () => {
    const randomId = Math.floor(Math.random() * 99) + 1;
    Axios.get(`https://jsonplaceholder.typicode.com/posts/${randomId}`).then((response) => {
      const randomImage = `https://picsum.photos/id/${randomId}/600/600`;
      const allTags = response.data.title.split(' ');
      const newBlog: Blog = {
        id: v4(),
        title: response.data.title,
        createdAt: Date.now(),
        text: response.data.body,
        image: randomImage,
        tags: allTags.slice(0, 3),
        likes: 0,
        author: {
          name: activeUser.name,
          rating: activeUser.rating,
          image: activeUser.image || '',
        },
        comments: [],
      };
      const blogsLocalStorage = JSON.parse(localStorage.blogs || '[]');
      blogsLocalStorage.push(newBlog);
      localStorage.blogs = JSON.stringify(blogsLocalStorage);
      dispatch(addBlog(newBlog));
      setText('');
      setTitle('');
      setTag('');
      setErrorInfo('Blog Added');
      setImage('');
    });
  };

  return (
    <div>
      <form action="submit" onSubmit={(e) => submitBlog(e)}>
        <h1 className={style.heading}> Adding Blog </h1>
        <div className={style.wrapp}>
          <input
            className={style.input}
            value={image}
            type="text"
            placeholder="Image Link"
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            className={style.input}
            value={title}
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className={style.inputDescription}
            value={text}
            type="text"
            placeholder="Description"
            onChange={(e) => setText(e.target.value)}
          />

          <input
            className={style.input}
            value={tag}
            type="text"
            placeholder="Tags"
            onChange={(e) => setTag(e.target.value)}
          />

          <Button text="submit" onClick={() => {}} isTypeButton={false} color="#45a29e" />
        </div>
      </form>
      {activeUser.status === 'admin' && (
        <Button text="Generate blog" color="#45a29e" onClick={generateBlogFromApi} />
      )}
      <h3>{errorInfo}</h3>
    </div>
  );
};
