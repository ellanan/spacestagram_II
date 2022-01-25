import { useEffect, useState } from 'react';

import _ from 'lodash';
import { DateTime } from 'luxon';

import { PictureOfTheDay } from './PictureOfTheDay';

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
  likedItems: Array<string>;
  setItemLikedOrNotLiked: (isLiked: boolean, itemId: string) => void;
}> = ({ setLoading, likedItems, setItemLikedOrNotLiked }) => {
  const [data, setData] = useState<Array<SpacestagramType>>([]);
  const [serverError, setServerError] = useState<boolean>(false);

  const [endDate, setEndDate] = useState<DateTime>(DateTime.now());
  const startDate = endDate.minus({ days: 8 });

  const endDateString = endDate.toFormat('yyyy-MM-dd');
  const startDateString = startDate.toFormat('yyyy-MM-dd');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setServerError(false);

      try {
        const response = await fetch(
          `https://spacestagram.ellanan.com/api/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${startDateString}&end_date=${endDateString}`
        );

        const statusCode = response.status;
        if (statusCode >= 500) {
          console.log('Server Error');
          setServerError(true);
          setLoading(false);
          return;
        }

        const result = await response.json();
        setData((previousData) => {
          return [...previousData, ...result];
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [startDateString, endDateString, setLoading]);

  return (
    <div className='main-wrapper'>
      {serverError ? (
        <h3>Server Error. Please try again in a few minutes.</h3>
      ) : null}
      <div className='card-wrapper'>
        {_.orderBy(data, ['date'], ['desc'])?.map((item) => {
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
      <button
        className='load-more-button'
        onClick={() => setEndDate(endDate.minus({ days: 9 }))}
      >
        load more
      </button>
    </div>
  );
};
