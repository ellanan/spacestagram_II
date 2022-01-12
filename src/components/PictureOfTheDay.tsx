import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

export const PictureOfTheDay: React.FC<{
  date: string;
  title: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  explanation: string;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}> = ({
  date,
  title,
  mediaUrl,
  mediaType,
  explanation,
  isLiked,
  setIsLiked,
  isFocused,
  setIsFocused,
}) => {
  return (
    <a
      href={`?focus=${date}`}
      onClick={(e) => {
        e.preventDefault();
        setIsFocused(!isFocused);
      }}
    >
      <figure className='card' key={date}>
        {mediaType === 'image' ? (
          <img className='media' src={mediaUrl} alt='' />
        ) : (
          <iframe
            className='media'
            title={title}
            src={mediaUrl}
            allowFullScreen
          />
        )}
        <figcaption>
          <div className='title-explanation-wrapper'>
            <h2 className='picture-of-the-day-title'>{title}</h2>
            <p className='explanation'>
              {isFocused ? explanation : `${explanation.substring(0, 55)} ...`}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsFocused(!isFocused);
                }}
              >
                {isFocused ? 'show less' : 'read more'}
              </button>
            </p>
          </div>
          <div className='like-and-date-wrapper'>
            <button
              className='like-button'
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
            >
              {isLiked ? (
                <BsFillHeartFill size={18} color='rgb(237, 73, 86)' />
              ) : (
                <BsHeart size={18} />
              )}
            </button>
            <time className='date-of-capture'>{`Date of capture: ${date}`}</time>
          </div>
        </figcaption>
      </figure>
    </a>
  );
};
