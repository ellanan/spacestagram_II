import _ from 'lodash';
import { useEffect, useState } from 'react';

import { PictureOfTheDay } from './components/PictureOfTheDay';
import { useLocalStorage } from './hooks/useLocalStorage';

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

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<null | Array<SpacestagramType>>(null);
  const [likedItems, setLikedItems] = useLocalStorage<Array<string>>(
    'likedItems',
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://spacestagram.ellanan.com/api/apod?api_key=${
            process.env.REACT_APP_NASA_API_KEY
          }&start_date=${'2022-01-01'}&end_date=${'2022-01-10'}`
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className='mainWrapper'>
      <h1 className='spacestagramTitle'>Spacestagram</h1>
      {loading ? <span>loading...</span> : null}
      <div className='cardWrapper'>
        {data?.map((item) => {
          return (
            <PictureOfTheDay
              date={item.date}
              title={item.title}
              mediaUrl={item.url}
              mediaType={item.media_type}
              isLiked={likedItems.includes(item.date)}
              setIsLiked={(isLiked) => {
                setLikedItems(
                  isLiked
                    ? [...likedItems, item.date]
                    : _.without(likedItems, item.date)
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
