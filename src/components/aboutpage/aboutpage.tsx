import React, { FC } from 'react';
import style from './aboutpage.module.scss';

export const Aboutpage: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.row}>
        <h1 className={style.title}> My story </h1>
      </div>
      <div className={style.row}>
        <h2 className={style.paraHead}> Meet the Man Who Started It All </h2>
        <h3 className={style.middleParag}>
          Hey everyone! Pat here. I’m a family man who learned about online business because I had
          to. Like so many other people who have faced hardships in their jobs, I was forced to
          adapt—and quickly—to support myself and my family. Today, I’m well into my Plan B career.
        </h3>
        <br />
        <h4 className={style.smallParag}>
          I graduated from college with an architecture degree and went to work for an amazing
          architectural firm as a Job Captain. I was thriving in my career and had no plans to leave
          it—but there are some parts of life we can’t control.
        </h4>
        <br />
        <h4 className={style.smallParag}>
          The economic collapse of 2008 hit my industry hard. I watched with deep sadness as many of
          my colleagues lost their jobs. I survived for a while, so I began to think I might make
          it. I was wrong. With just a few months to go before my wedding, I was laid off too.
        </h4>
      </div>
    </div>
  );
};
