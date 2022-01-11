import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

import { useLocalStorage } from '../hooks/useLocalStorage';

export const Likes: React.FC<{ itemTitle: string }> = ({ itemTitle }) => {
  const [isLiked, setIsLiked] = useLocalStorage<boolean>(itemTitle, false);

  return (
    <>
      {isLiked ? (
        <button className='likeButton' onClick={() => setIsLiked(false)}>
          <BsFillHeartFill size={18} color='red' />
        </button>
      ) : (
        <button className='likeButton' onClick={() => setIsLiked(true)}>
          <BsHeart size={18} />
        </button>
      )}
    </>
  );
};
