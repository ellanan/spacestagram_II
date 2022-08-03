// import { NavLink } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

import navbarStyles from '../styles/Navbar.module.css';

export const Navbar = () => {
  const router = useRouter();

  return (
    <div className={navbarStyles.navbarWrapper}>
      <Link href='/'>
        <a className={navbarStyles.spacestagramTitle}>Spacestagram II</a>
      </Link>
      <Link aria-label='Home' href='/'>
        <a
          className={`${navbarStyles.navitem} ${navbarStyles.homeButton} ${
            router.pathname === '/' ? navbarStyles.active : ''
          }`}
        >
          <AiOutlineHome size={24} />
        </a>
      </Link>
      <Link aria-label='Liked' href='/liked'>
        <a
          className={`${navbarStyles.navitem} ${navbarStyles.likedButton} ${
            router.pathname === '/liked' ? navbarStyles.active : ''
          }`}
        >
          <AiOutlineHeart size={24} />
        </a>
      </Link>
    </div>
  );
};
