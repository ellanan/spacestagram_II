import { NavLink } from 'react-router-dom';

import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

export const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <NavLink className='spacestagram-title' to='/'>
        Spacestagram II
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `navitem home-button ${isActive ? 'active' : ''}`
        }
        to='/'
      >
        <AiOutlineHome size={24} />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `navitem liked-button ${isActive ? 'active' : ''}`
        }
        to='/liked'
      >
        <AiOutlineHeart size={24} />
      </NavLink>
    </div>
  );
};
