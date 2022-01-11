import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<null | Array<SpacestagramType>>(null);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${
        process.env.REACT_APP_NASA_API_KEY
      }&start_date=${'2022-01-01'}&end_date=${'2022-01-10'}`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));

    setLoading(false);
  }, []);

  console.log(data);

  return (
    <div>
      <h1 className='spacestagramTitle'>Spacestagram</h1>
      {loading ? (
        <span>loading...</span>
      ) : (
        data?.map((item: any) => {
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
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
