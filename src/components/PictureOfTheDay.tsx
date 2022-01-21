import { useEffect, useState } from 'react';

import { Tooltip } from '@chakra-ui/react';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { IoShareSocialOutline } from 'react-icons/io5';

export const PictureOfTheDay: React.FC<{
  date: string;
  title: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  explanation: string;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  setIsFocused: (isFocused: boolean) => void;
}> = ({
  date,
  title,
  mediaUrl,
  mediaType,
  explanation,
  isLiked,
  setIsLiked,
  setIsFocused,
}) => {
  const [copySuccessMessage, setCopySuccessMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopySuccessMessage('');
    }, 1000);
    return () => clearTimeout(timer);
  }, [copySuccessMessage, setCopySuccessMessage]);

  const shareUrl = `https://spacestagram2.ellanan.com/?focus=${date}`;

  return (
    <a
      href={`?focus=${date}`}
      onClick={(e) => {
        e.preventDefault();
        setIsFocused(true);
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
              {explanation.length > 75
                ? explanation.substring(0, 75).concat('...')
                : explanation}
            </p>
            <span className='copy-success-message'>{copySuccessMessage}</span>
          </div>
          <div className='like-and-date-wrapper'>
            <div>
              <Tooltip className='tooltip' label='Like'>
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
              </Tooltip>
              <Tooltip className='tooltip' label='Share'>
                <button
                  className='share-button'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.clipboard.writeText(shareUrl);
                    setCopySuccessMessage('Copied link to clipboard!');
                  }}
                >
                  <IoShareSocialOutline size={19} />
                </button>
              </Tooltip>
            </div>
            <time className='date-of-capture'>{`Date of capture: ${date}`}</time>
          </div>
        </figcaption>
      </figure>
    </a>
  );
};
