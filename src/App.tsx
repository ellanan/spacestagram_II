import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { Liked } from './components/Liked';
import { Navbar } from './components/Navbar';
import { TopPage } from './components/TopPage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pictureInFocus, setPictureInFocus] = useState<string | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('focus');
  });

  return (
    <div>
      <Navbar />
      <span className='attribution'>
        Brought to you by NASA's Astronomy Photo of the Day (APOD) API
      </span>
      {loading ? <span>loading...</span> : null}
      <Routes>
        <Route
          path='/'
          element={
            <Home
              setLoading={setLoading}
              pictureInFocus={pictureInFocus}
              setPictureInFocus={setPictureInFocus}
            />
          }
        />
        <Route
          path='/liked'
          element={
            <Liked
              setLoading={setLoading}
              pictureInFocus={pictureInFocus}
              setPictureInFocus={setPictureInFocus}
            />
          }
        />
      </Routes>
      <TopPage />
    </div>
  );
}

export default App;
