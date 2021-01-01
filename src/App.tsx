import React from 'react';
import './App.module.scss';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import BlogPage from './pages/blog';
import NotFound from './pages/notFound';
import { Header } from './components/header/header';
import User from './pages/user';
import LogIn from './pages/logIn';
import Register from './pages/registerPage';
import { Blogpageadd } from './components/blogpageadd/blogpageadd';

export const App = () => {
  return (
    <div className="container">
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/addblogpage">
            <Blogpageadd />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/blog/:id">
            <BlogPage />
          </Route>
          <Route exact path="/user">
            <User />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};
