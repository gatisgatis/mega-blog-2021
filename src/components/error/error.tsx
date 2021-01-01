import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import style from './error.module.scss';
import { Button } from '../button/button';

export const Error: FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  const img =
    'https://www.sageisland.com/wp-content/uploads/2015/04/creative-404-error-page-design-marketing-assets.jpg';

  return (
    <div style={{ backgroundImage: `url(${img})` }} className={style.img}>
      <div className={style.buttonWrapp}>
        <Button text="Back to Home" onClick={handleClick} />
      </div>
    </div>
  );
};
