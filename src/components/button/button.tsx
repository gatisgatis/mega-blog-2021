import React, { FC } from 'react';
import style from './button.module.scss';

interface Props {
  size?: 'larger' | 'smaller' | 'normal';
  text: string;
  color?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isTypeButton?: boolean;
}

export const Button: FC<Props> = ({ size = 'normal', isTypeButton = true, text, color = 'grey', onClick }) => {
  const calculateSize = () => {
    if (size === 'smaller') return '3px 8px';
    if (size === 'larger') return '10px 25px';
    return '10px';
  };

  return (
    <button
      className={style.button}
      type={isTypeButton ? 'button' : 'submit'}
      onClick={onClick}
      style={{ backgroundColor: color, padding: calculateSize() }}
    >
      {text}
    </button>
  );
};
