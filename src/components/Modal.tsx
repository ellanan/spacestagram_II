import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

export const Modal: React.FC<{
  date: string;
  title: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  explanation: string;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  onClose: () => void;
}> = ({
  date,
  title,
  mediaUrl,
  mediaType,
  explanation,
  isLiked,
  setIsLiked,
  onClose,
}) => {
  let dateString =
    date.split('-')[0].substring(2, 4) +
    date.split('-')[1] +
    date.split('-')[2];

  return (
    <div className='modal-container isOpen' onClick={onClose}>
      <div className='modal-content'>
        <figure className='modal-figure'>
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
            <div className='source-link-wrapper'>
              <button
                className='source-link'
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `https://apod.nasa.gov/apod/ap${dateString}.html`,
                    '_blank'
                  );
                }}
              >
                Source
              </button>
            </div>
            <h2 className='picture-of-the-day-title'>{title}</h2>
            <p className='explanation'>{explanation}</p>
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
      </div>
    </div>
  );
};
