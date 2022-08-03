import { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import { PictureOfTheDay } from './PictureOfTheDay';
import { SpacestagramType } from './Home';
import { useApodContext } from '../hooks/useApodContext';
import likedStyles from '../styles/Liked.module.css';

export const Liked = () => {
  const [likedData, setLikedData] = useState<Array<SpacestagramType>>([]);

  const { setLoading, likedItems, setItemLikedOrNotLiked } = useApodContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await Promise.all(
          likedItems.map((date) =>
            fetch(`https://apod.ellanan.com/api?date=${date}`).then(
              (response) => response.json()
            )
          )
        );
        setLikedData(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [likedItems, setLoading, setLikedData]);

  return (
    <div className={likedStyles.mainWrapper}>
      <div className={likedStyles.cardWrapper}>
        {_.orderBy(likedData, ['date'], ['desc']).map((item) => {
          return (
            <div key={item.date}>
              <PictureOfTheDay
                date={item.date}
                title={item.title}
                mediaUrl={item.url}
                explanation={item.explanation}
                mediaType={item.media_type}
                isLiked={likedItems.includes(item.date)}
                setIsLiked={(isLiked) => {
                  setItemLikedOrNotLiked(isLiked, item.date);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
