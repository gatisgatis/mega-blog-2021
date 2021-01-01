import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import style from './header.module.scss';
import { Nav } from '../navigation/navigation';
import { Button } from '../button/button';
import { RootState } from '../../store';
import { logOut } from '../../store/users/actions';

// settings poga, logo , navigacojas comp, login.reg pogas,
export const Header: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const activeUser = useSelector((state: RootState) => {
    return state.activeUser.name;
  });

  const activeUserStatus = useSelector((state: RootState) => {
    return state.activeUser.status;
  });

  return (
    <div className={style.header}>
      <div className={style.topWrapper}>
        <div className={style.imgWrapper}>
          <img
            src="https://www.shareicon.net/data/512x512/2016/04/19/752055_logo_512x512.png"
            alt="Logo"
            className={style.img}
          />
        </div>
        <div className={style.buttonWrapper}>
          {activeUserStatus === 'guest' && (
            <div className={style.button}>
              <Button
                text="Login"
                onClick={() => history.push('/login')}
                size="smaller"
                color="#45a29e"
              />
              <Button
                text="Register"
                onClick={() => history.push('/register')}
                size="smaller"
                color="#45a29e"
              />
            </div>
          )}
          {activeUserStatus !== 'guest' && (
            <div className={style.button}>
              <Button
                text="Log Out"
                onClick={() => dispatch(logOut())}
                size="smaller"
                color="#45a29e"
              />
              <Button
                text={activeUser}
                onClick={() => history.push('/user')}
                color="red"
                size="smaller"
              />
              <div>
                <Button
                  text="Add blog"
                  onClick={() => history.push('/addblogpage')}
                  color="#45a29e"
                  size='smaller'
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Nav />
    </div>
  );
};
