import { BsHeart, BsFillHeartFill } from 'react-icons/bs';

export const Modal: React.FC<{
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
    <div
      className={`${isFocused ? 'modal-container isOpen' : 'modal-container'}`}
    >
      <div className='modal-content'>
        <figure
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          {mediaType === 'image' ? (
            <img className='media' src={mediaUrl} alt='' />
          ) : (
            <iframe
              className='media'
              style={{
                flexShrink: '0',
                borderRadius: '12px',
                margin: '1rem 0',
              }}
              title={title}
              src={mediaUrl}
              allowFullScreen
            />
          )}
          <figcaption
            style={{
              flexShrink: '1',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            <h2 className='picture-of-the-day-title'>{title}</h2>
            <p
              className='explanation'
              style={{ overflow: 'scroll', padding: '0' }}
            >
              {explanation}
            </p>
            <div className='like-and-date-wrapper' style={{ bottom: '0' }}>
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
