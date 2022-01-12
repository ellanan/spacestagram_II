import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

export const PictureOfTheDay: React.FC<{
  date: string;
  title: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
}> = ({ date, title, mediaUrl, mediaType, isLiked, setIsLiked }) => {
  return (
    <figure className='card' key={date}>
      {mediaType === 'image' ? (
        <img className='imageVideoSize' src={mediaUrl} alt='' />
      ) : (
        <iframe
          className='imageVideoSize'
          title={title}
          src={mediaUrl}
          allowFullScreen
        />
      )}
      <figcaption>
        <h3>{title}</h3>
        <time className='dateOfCapture'>{date}</time>
        <button className='likeButton' onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <BsFillHeartFill size={18} color='red' />
          ) : (
            <BsHeart size={18} />
          )}
        </button>
        <button>Learn more</button>
      </figcaption>
    </figure>
  );
};
