import { useState } from 'react';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

export const Likes = () => {
  const [likes, setLikes] = useState<boolean>(false);

  return (
    <>
      {likes ? (
        <button className='likeButton' onClick={() => setLikes(false)}>
          <BsFillHeartFill size={18} color='red' />
        </button>
      ) : (
        <button className='likeButton' onClick={() => setLikes(true)}>
          <BsHeart size={18} />
        </button>
      )}
    </>
  );
};
