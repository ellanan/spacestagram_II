import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { IoShareSocialOutline } from 'react-icons/io5';

import { SpacestagramType } from './Home';
import modalStyles from '../styles/Modal.module.css';

export const Modal: React.FC<{
  likedItems: Array<string>;
  setItemLikedOrNotLiked: (isLiked: boolean, itemId: string) => void;
}> = ({ likedItems, setItemLikedOrNotLiked }) => {
  const router = useRouter();
  const { focus } = router.query;
  // const location = useLocation();
  // const [searchParams] = useSearchParams();

  const [copyLinkTooltipMessage, setCopyLinkTooltipMessage] = useState('Share');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyLinkTooltipMessage('Share');
    }, 2000);
    return () => clearTimeout(timer);
  }, [copyLinkTooltipMessage, setCopyLinkTooltipMessage]);

  const [focusedItemData, setFocusedItemData] =
    useState<SpacestagramType | null>(null);

  // const focusedDate = useMemo(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   return searchParams.get('focus');
  // }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      if (!focus) {
        setFocusedItemData(null);
        return;
      }
      try {
        const response = await fetch(
          `https://apod.ellanan.com/api?date=${focus}`
        );

        const result = await response.json();
        setFocusedItemData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [focus]);

  if (!focusedItemData) return null;

  const isLiked = likedItems.includes(focusedItemData.date);

  const {
    date,
    title,
    url: mediaUrl,
    media_type: mediaType,
    explanation,
  } = focusedItemData;

  let sourceDateString =
    date.split('-')[0].substring(2, 4) +
    date.split('-')[1] +
    date.split('-')[2];

  const shareUrl = `https://spacestagram2.ellanan.com/?focus=${date}`;

  return (
    <Link
      className={modalStyles.modalContainer + ' ' + modalStyles.modalOpen}
      href={{ pathname: '/', query: { focus: date } }}
      // to={{
      //   ...location,
      //   search: new URLSearchParams(
      //     Array.from(searchParams.entries()).filter(
      //       ([key, value]) => key !== 'focus'
      //     )
      //   ).toString(),
      // }}
    >
      <div className={modalStyles.modalContent}>
        <figure className={modalStyles.modalFigure}>
          {mediaType === 'image' ? (
            <img
              className={modalStyles.media + ' ' + modalStyles.modalContent}
              src={mediaUrl}
              alt=''
            />
          ) : (
            <iframe
              className={modalStyles.media}
              title={title}
              src={mediaUrl}
              allowFullScreen
            />
          )}
          <figcaption>
            <div className={modalStyles.sourceLinkWrapper}>
              <Tippy content="Go to NASA's source page." hideOnClick={false}>
                <button
                  className={modalStyles.sourceLink}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      `https://apod.nasa.gov/apod/ap${sourceDateString}.html`,
                      '_blank'
                    );
                  }}
                >
                  Source
                </button>
              </Tippy>
            </div>
            <h2 className={modalStyles.pictureOfTheDayTitle}>{title}</h2>
            <p className={modalStyles.explanation}>{explanation}</p>
            <div className={modalStyles.likeAndDateWrapper}>
              <div>
                <Tippy
                  content={isLiked ? 'Unlike' : 'Like'}
                  hideOnClick={false}
                >
                  <button
                    className={modalStyles.likeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setItemLikedOrNotLiked(!isLiked, date);
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
                    className={modalStyles.shareButton}
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
              <time
                className={modalStyles.dateOfCapture}
              >{`Date of capture: ${date}`}</time>
            </div>
          </figcaption>
        </figure>
      </div>
    </Link>
  );
};
