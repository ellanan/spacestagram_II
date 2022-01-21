import { NavLink } from 'react-router-dom';

import { Tooltip } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

export const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <NavLink className='spacestagram-title' to='/'>
        Spacestagram II
      </NavLink>
      <Tooltip className='=tooltip' label='Home' placement='bottom'>
        <NavLink
          className={({ isActive }) =>
            `navitem home-button ${isActive ? 'active' : ''}`
          }
          to='/'
        >
          <AiOutlineHome size={24} />
        </NavLink>
      </Tooltip>
      <Tooltip className='=tooltip' label='Likes' placement='bottom'>
        <NavLink
          className={({ isActive }) =>
            `navitem liked-button ${isActive ? 'active' : ''}`
          }
          to='/liked'
        >
          <AiOutlineHeart size={24} />
        </NavLink>
      </Tooltip>
    </div>
  );
};
