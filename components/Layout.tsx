import React from 'react';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import layoutStyles from '../styles/Layout.module.css';

export const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Navbar />
      <span className={layoutStyles.attribution}>
        Brought to you by NASA's Astronomy Photo of the Day (APOD) &&nbsp;
        <a
          className={layoutStyles.apodApi}
          href='https://github.com/ellanan/apod-api'
        >
          APOD-API
        </a>
      </span>
      {children}
      <Footer />
    </>
  );
};
