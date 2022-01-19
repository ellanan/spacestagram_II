import { useEffect, useState } from 'react';

import _ from 'lodash';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { PictureOfTheDay } from './PictureOfTheDay';
import { Modal } from './Modal';
import { SpacestagramType } from './Home';

export const Liked: React.FC<{
  setLoading: (loading: boolean) => void;
  pictureInFocus: string | null;
  setPictureInFocus: (pictureInFocus: string | null) => void;
}> = ({ setLoading, pictureInFocus, setPictureInFocus }) => {
  const [likedData, setLikedData] = useState<Array<SpacestagramType>>([]);
  const [likedItems, setLikedItems] = useLocalStorage<Array<string>>(
    'likedItems',
    []
  );

  useEffect(() => {
    const likedItemsArray = likedItems.map((item) => item);

    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await Promise.all(
          likedItemsArray.map((date) =>
            fetch(
              `https://spacestagram.ellanan.com/api/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${date}`
            ).then((res) => res.json())
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
              {pictureInFocus === item.date && (
                <Modal
                  date={item.date}
                  title={item.title}
                  mediaUrl={item.url}
                  explanation={item.explanation}
                  mediaType={item.media_type}
                  isLiked={likedItems.includes(item.date)}
                  setIsLiked={(isLiked) => {
                    setLikedItems(
                      isLiked
                        ? [...likedItems, item.date]
                        : _.without(likedItems, item.date)
                    );
                  }}
                  onClose={() => {
                    setPictureInFocus(null);
                    window.history.pushState(null, '');
                  }}
                />
              )}
              <PictureOfTheDay
                date={item.date}
                title={item.title}
                mediaUrl={item.url}
                explanation={item.explanation}
                mediaType={item.media_type}
                isLiked={likedItems.includes(item.date)}
                setIsLiked={(isLiked) => {
                  setLikedItems(
                    isLiked
                      ? [...likedItems, item.date]
                      : _.without(likedItems, item.date)
                  );
                }}
                setIsFocused={(isFocused) => {
                  setPictureInFocus(item.date);
                  window.history.pushState(null, '', `?focus=${item.date}`);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
