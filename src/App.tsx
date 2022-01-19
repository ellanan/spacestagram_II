import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { Liked } from './components/Liked';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pictureInFocus, setPictureInFocus] = useState<string | null>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('focus');
  });

  return (
    <>
      <Navbar />
      <span className='attribution'>
        Brought to you by NASA's Astronomy Photo of the Day (APOD) API
      </span>
      {loading ? (
        <span className='loading'>Loading data from Nasa...</span>
      ) : null}
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
      <Footer />
    </>
  );
}

export default App;
