/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../types/types';
import { Button } from '../button/button';
import style from './registerform.module.scss';

const Registerform = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [age, setAge] = useState('18');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [errorInfo, setErrorInfo] = useState('');

  const history = useHistory();

  const userNameInputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userNameInputField.current!.focus();
  }, []);

  const ageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value, 10) < 1) {
      setAge('99');
      return;
    }
    if (parseInt(e.target.value, 10) > 99) {
      setAge('1');
      return;
    }
    setAge(e.target.value);
  };

  const submitRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setErrorInfo('');
    }, 3000);
    if (
      username === '' ||
      password === '' ||
      name === '' ||
      gender === '' ||
      status === '' ||
      image === ''
    ) {
      setErrorInfo('Fill the emty fields');
      return;
    }
    const newUser: User = {
      username,
      password,
      image,
      age: parseInt(age, 10),
      gender: gender as 'male' | 'female' | 'other',
      status: status as 'user' | 'admin' | 'guest',
      createdAt: Date.now(),
      rating: 0,
      name,
    };
    const usersLocalStorage: User[] = JSON.parse(localStorage.users);
    usersLocalStorage.push(newUser);
    localStorage.users = JSON.stringify(usersLocalStorage);
    setAge('');
    setName('');
    setGender('');
    setPassword('');
    setStatus('');
    setUsername('');
    setErrorInfo('Registration DONE!');
    setImage('');
    setTimeout(() => {
      history.push('/login');
    }, 1000);
  };

  return (
    <div>
      <h1 className={style.header}>Registration Form</h1>
      <form action="submit" onSubmit={(e) => submitRegistration(e)}>
        <h4 className={style.span}> Enter username </h4>
        <input
          ref={userNameInputField}
          className={style.input}
          value={username}
          type="text"
          placeholder="username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <h4 className={style.span}> Enter password</h4>
        <input
          className={style.input}
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <h4 className={style.span}> Enter Name</h4>
        <input
          className={style.input}
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <h4 className={style.span}> Enter profile Image link</h4>
        <input
          className={style.input}
          value={image}
          type="text"
          placeholder="Image"
          onChange={(e) => setImage(e.target.value)}
        />
        <div>
          <h4 className={style.span}>Gender</h4>
          <label htmlFor="male">Male</label>
          <input
            className={style.radio}
            onChange={(e) => setGender(e.target.value)}
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
          />
          <label htmlFor="female">Female</label>
          <input
            className={style.radio}
            onChange={(e) => setGender(e.target.value)}
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
          />
          <label htmlFor="other">Other</label>
          <input
            className={style.radio}
            onChange={(e) => setGender(e.target.value)}
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={gender === 'other'}
          />
        </div>
        <h4 className={style.span}> Enter your Age</h4>
        <input
          className={style.input}
          type="number"
          value={age}
          placeholder="Age"
          onChange={(e) => ageChangeHandler(e)}
        />
        <h4 className={style.span}> Enter status</h4>
        <div className={style.Status}>
          <label htmlFor="user">User</label>
          <input
            className={style.radio}
            onChange={(e) => setStatus(e.target.value)}
            type="radio"
            id="user"
            name="status"
            value="user"
            checked={status === 'user'}
          />
          <label htmlFor="admin">Admin</label>
          <input
            className={style.radio}
            onChange={(e) => setStatus(e.target.value)}
            type="radio"
            id="admin"
            name="status"
            value="admin"
            checked={status === 'admin'}
          />
        </div>
        <div className="margin-top--25">
          <Button
            isTypeButton={false}
            text="Register"
            onClick={() => {}}
            size="smaller"
            color="#45a29e"
          />
        </div>
      </form>
      <h3 className={style.error}>{errorInfo}</h3>
    </div>
  );
};

export default Registerform;
