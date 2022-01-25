import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import Tippy from '@tippyjs/react';
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
}> = ({
  date,
  title,
  mediaUrl,
  mediaType,
  explanation,
  isLiked,
  setIsLiked,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [copyLinkTooltipMessage, setCopyLinkTooltipMessage] = useState('Share');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyLinkTooltipMessage('Share');
    }, 2000);
    return () => clearTimeout(timer);
  }, [copyLinkTooltipMessage, setCopyLinkTooltipMessage]);

  const shareUrl = `https://spacestagram2.ellanan.com/?focus=${date}`;

  return (
    <NavLink
      to={{
        ...location,
        search: new URLSearchParams([
          ...Array.from(searchParams.entries()),
          ['focus', date],
        ]).toString(),
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
          </div>
          <div className='like-and-date-wrapper'>
            <div>
              <Tippy content={isLiked ? 'Unlike' : 'Like'} hideOnClick={false}>
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
              </Tippy>
              <Tippy content={copyLinkTooltipMessage} hideOnClick={false}>
                <button
                  className='share-button'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigator.clipboard.writeText(shareUrl);
                    setCopyLinkTooltipMessage('Copied link to clipboard!');
                  }}
                >
                  <IoShareSocialOutline size={19} />
                </button>
              </Tippy>
            </div>
            <time className='date-of-capture'>{`Date of capture: ${date}`}</time>
          </div>
        </figcaption>
      </figure>
    </NavLink>
  );
};
