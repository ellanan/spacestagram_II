import { useEffect, useState } from 'react';

import { Likes } from './components/Likes';
import { Loading } from './components/Loading';

export type SpacestagramType = {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<null | Array<SpacestagramType>>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${
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

  if (loading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <div>
      <h1 className='spacestagramTitle'>Spacestagram</h1>
      {data?.map((item: any) => {
        return (
          <div className='card' key={item.title}>
            {item.media_type === 'image' ? (
              <img className='imageVideoSize' src={item.url} alt='' />
            ) : (
              <iframe
                className='imageVideoSize'
                title={item.title}
                src={item.url}
                allowFullScreen
              />
            )}
            <h3>{item.title}</h3>
            <div>{item.date}</div>
            <p>{item.explanation}</p>
            <Likes itemTitle={item.title} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
