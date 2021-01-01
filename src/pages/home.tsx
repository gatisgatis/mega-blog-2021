import React from 'react';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { Card } from '../components/card/card';
import { Karuselis } from '../components/karuselis/karuselis';
import { Button } from '../components/button/button';
import { Find } from '../components/find/find';
import { RootState } from '../store/index';

const Home = () => {
  const searchInputValue = useSelector((state: RootState) => {
    return state.search.value;
  });

  const activeTag = useSelector((state: RootState) => {
    return state.activeTag.value;
  });

  const blogs = useSelector((state: RootState) => {
    return state.blogs;
  });

  const blogMatchActiveTag = (tags: string[], tagActive: string) => {
    if (tagActive === '') return true;
    if (tagActive === 'all') return true;
    let retunValue = false;
    tags.forEach((tag) => {
      if (tag.toLowerCase() === tagActive.toLowerCase()) retunValue = true;
    });
    return retunValue;
  };

  const blogPassFilter = (title: string, search: string): boolean => {
    if (search.length < 3) return true;
    if (title.toLowerCase().includes(search.toLowerCase())) return true;
    return false;
  };

  const smoothScroolToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className="test">
        <Karuselis />
        <Find />
        <div>
          {blogs.map((blog, index) => {
            return (
              blogPassFilter(blog.title, searchInputValue) &&
              blogMatchActiveTag(blog.tags, activeTag) && (
                <Card
                  title={blog.title}
                  authorName={blog.author.name}
                  creatDate={blog.createdAt}
                  key={v4()}
                  tags={blog.tags}
                  commentCount={blog.comments.length}
                  text={blog.text}
                  image={blog.image}
                  id={blog.id}
                />
              )
            );
          })}
        </div>
        <div className="flex justify-center margin-top--25">
          <Button text="Home" onClick={smoothScroolToTop} color="#45a29e" />
        </div>
      </div>
    </div>
  );
};

export default Home;
