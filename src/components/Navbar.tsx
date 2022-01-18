import { NavLink } from 'react-router-dom';

import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

export const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <h1 className='spacestagram-title'>Spacestagram</h1>
      <NavLink className='home-button' to='/'>
        <AiOutlineHome size={24} />
      </NavLink>
      <NavLink className='liked-button' to='/liked'>
        <AiOutlineHeart size={24} />
      </NavLink>
    </div>
  );
};
