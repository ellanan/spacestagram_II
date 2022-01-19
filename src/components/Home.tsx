import { useEffect, useState } from 'react';

import _ from 'lodash';
import { DateTime } from 'luxon';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { PictureOfTheDay } from './PictureOfTheDay';
import { Modal } from './Modal';

export type SpacestagramType = {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
};

export const Home: React.FC<{
  setLoading: (loading: boolean) => void;
  pictureInFocus: string | null;
  setPictureInFocus: (pictureInFocus: string | null) => void;
}> = ({ setLoading, pictureInFocus, setPictureInFocus }) => {
  const [data, setData] = useState<Array<SpacestagramType>>([]);

  const [likedItems, setLikedItems] = useLocalStorage<Array<string>>(
    'likedItems',
    []
  );

  const [endDate, setEndDate] = useState<DateTime>(DateTime.now());
  const startDate = endDate.minus({ days: 8 });

  const endDateString = endDate.toFormat('yyyy-MM-dd');
  const startDateString = startDate.toFormat('yyyy-MM-dd');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://spacestagram.ellanan.com/api/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${startDateString}&end_date=${endDateString}`
        );
        const result = await response.json();
        setData((previousData) => {
          return [...previousData, ...result];
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [startDateString, endDateString, setLoading]);

  return (
    <div className='main-wrapper'>
      <div className='card-wrapper'>
        {_.orderBy(data, ['date'], ['desc'])?.map((item) => {
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
      <button
        className='load-more-button'
        onClick={() => setEndDate(endDate.minus({ days: 9 }))}
      >
        load more
      </button>
    </div>
  );
};
