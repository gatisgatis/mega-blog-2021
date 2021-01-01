import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { FullBlog } from '../components/fullBlog/fullBlog';

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();

  const blog = useSelector((state: RootState) => {
    return state.blogs.find((item) => {
      return item.id === id;
    });
  });
  
  return (
    <div className="test">
      <FullBlog blog={blog!} />
    </div>
  );
};

export default BlogPage;
