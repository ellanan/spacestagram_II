import { useEffect, useState } from 'react';
import _ from 'lodash';

import { PictureOfTheDay } from './PictureOfTheDay';
import { SpacestagramType } from './Home';

export const Liked: React.FC<{
  setLoading: (loading: boolean) => void;
  likedItems: Array<string>;
  setItemLikedOrNotLiked: (isLiked: boolean, itemId: string) => void;
}> = ({ setLoading, likedItems, setItemLikedOrNotLiked }) => {
  const [likedData, setLikedData] = useState<Array<SpacestagramType>>([]);

  useEffect(() => {
    const likedItemsArray = likedItems.map((item) => item);

    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await Promise.all(
          likedItemsArray.map((date) =>
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
  }, [likedItems, setLoading]);

  return (
    <div className='main-wrapper'>
      <div className='card-wrapper'>
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
