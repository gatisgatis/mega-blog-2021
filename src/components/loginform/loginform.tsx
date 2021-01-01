import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logIn } from '../../store/users/actions';
import { User } from '../../types/types';
import { Button } from '../button/button';
import style from './loginform.module.scss';

const Loginform = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorInfo, setErrorInfo] = useState('');

  const userNameInputField = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const userNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorInfo('Wrong password or username');
    const localStorageUsers: User[] = JSON.parse(localStorage.users);
    const matchPassAndUsername = localStorageUsers.find((user) => {
      return user.username === username && user.password === password;
    });
    if (matchPassAndUsername) {
      dispatch(logIn(matchPassAndUsername));
      setUsername('');
      setPassword('');
      setErrorInfo('Nice!');
      setTimeout(() => {
        history.push('/');
      }, 1000);
    } else {
      setErrorInfo('Somthing Wrong try again!');
    }
  };

  useEffect(() => {
    userNameInputField.current!.focus();
  }, []);

  return (
    <div>
      <h1 className={style.header}>Login</h1>
      <form action="submit" onSubmit={(e) => submitHandler(e)}>
        <input
          ref={userNameInputField}
          className={style.input}
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => userNameChangeHandler(e)}
        />
        <input
          className={style.input}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => passwordInputHandler(e)}
        />
        <div className={style.button}>
          <Button
            isTypeButton={false}
            text="Submit"
            onClick={() => {}}
            size="smaller"
            color="#45a29e"
          />
        </div>
      </form>
      <h3>{errorInfo}</h3>
    </div>
  );
};

export default Loginform;
